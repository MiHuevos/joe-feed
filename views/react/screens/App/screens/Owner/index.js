const React = require('react');
const { listen } = require('flux');
const Im = require('immutable');
const Post = require('./post');
const { Link } = require('react-router');

@listen(['posts', 'owners'])
class Owner extends React.Component {
  static propTypes = {
    posts: React.PropTypes.instanceOf(Im.List),
    owners: React.PropTypes.instanceOf(Im.Set),
    actions: React.PropTypes.instanceOf(Im.Map),
    params: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!this.ownerData(this.props.params.owner).name) {
      this.props.actions.get('fetchOwner')(this.props.params.owner);
    }
  }

  ownerData(ownerId) {
    if (ownerId.charAt(0) === '@') {
      ownerId = ownerId.slice(1);
    }
    const ownerData = this.props.owners.filter(owner => (
      owner.get('id') === ownerId
    )).first();
    return ownerData ? ownerData.toJS() : {};
  }

  posts() {
    return this.props.posts.filter(post => (
      post.get('postedOn') === this.props.params.owner
    )).valueSeq().toJS();
  }

  render() {
    const { name } = this.ownerData(this.props.params.owner);

    return (
      <div>
        <h2>Posts by { name }</h2>
        <h3><Link to={ `/magma` }>magma</Link> <Link to="/@gal">gal</Link></h3>
        <ul>
          {this.posts().map(post => (
            <li key={ post.id }>
              <Post
                title={ post.title }
                text={ post.text }
                owner={{
                  name: this.ownerData(post.postedOn).name
                }}
                author={{
                  name: this.ownerData(post.author).name
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = Owner;
