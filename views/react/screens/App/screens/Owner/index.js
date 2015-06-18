const React = require('react');
const { listen } = require('flux');
const Im = require('immutable');
const Post = require('./post');
const sliceAt = require('utils/slice-at');
const { Link } = require('react-router');
const MediumEditor = require('components/medium-editor');

@listen(['posts', 'owners', 'userData'])
class Owner extends React.Component {
  static propTypes = {
    posts: React.PropTypes.instanceOf(Im.Map),
    owners: React.PropTypes.instanceOf(Im.Set),
    actions: React.PropTypes.instanceOf(Im.Map),
    params: React.PropTypes.object.isRequired,
  };

  ownerData(ownerId) {
    const ownerData = this.props.owners.filter(owner => (
      owner.get('id') === sliceAt(ownerId)
    )).first();
    return ownerData ? ownerData.toJS() : {};
  }

  posts() {
    return this.props.posts.filter(post => (
      post.get('postedOn') === this.props.params.owner ||
      post.get('author') === sliceAt(this.props.params.owner)
    )).valueSeq().toJS();
  }

  handleChangeData(marked) {
    console.log(marked);
  }

  render() {
    const { name } = this.ownerData(this.props.params.owner);

    return (
      <div>
        <h2>הזרם של { name }</h2>
        <h3>
          <Link to={ `/magma` }>magma</Link>
          <Link to="/@gal">gal</Link>
          <Link to="/@tomer">tomer</Link>
          <Link to="/@arieljannai">ariel</Link>
        </h3>
        { this.props.userData.remoteUser === sliceAt(this.props.params.owner) && <MediumEditor onChange={ this.handleChangeData } /> }
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
