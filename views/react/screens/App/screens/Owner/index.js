const React = require('react');
const { route, listen } = require('flux');
const Im = require('immutable');
const Post = require('./post');
const sliceAt = require('utils/slice-at');
const { Link } = require('react-router');
const moment = require('moment');

@route
@listen(['posts', 'owners', 'userData'])
class Owner extends React.Component {
  static propTypes = {
    posts: React.PropTypes.instanceOf(Im.Map),
    owners: React.PropTypes.instanceOf(Im.Set),
    userData: React.PropTypes.shape({
      adGroups: React.PropTypes.arrayOf(React.PropTypes.string),
      remoteUser: React.PropTypes.string
    }),
    actions: React.PropTypes.instanceOf(Im.Map),
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

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
    )).valueSeq().sort((postA, postB) => {
      const timeA = moment(postA.get('createdAt'));
      const timeB = moment(postB.get('createdAt'));
      return timeA.isBefore(timeB);
    }).toJS();
  }

  handleChangeData(marked) {
    console.log(marked);
  }

  render() {
    const { name } = this.ownerData(this.props.params.owner);
    const canEdit = (
      this.props.userData.remoteUser === sliceAt(this.props.params.owner) ||
      this.props.userData.adGroups.indexOf(this.props.params.owner) !== -1
    );

    return (
      <div
        style={{
          padding: '1em'
        }}
      >
        <h3 style={{ textAlign: 'center' }}>
          <Link to={ `/magma` }>magma</Link>
          <Link to="/@gal">gal</Link>
          <Link to="/@tomer">tomer</Link>
          <Link to="/@arieljannai">ariel</Link>
        </h3>
        <h1 style={{
          fontSize: '1.5em',
          fontWeight: 'bolder'
        }}>
          הזרם של { name }
        </h1>
        {
          canEdit &&  (this.props.children)
        }
        { canEdit && <Link to={`/${this.props.params.owner}/new`}>משהו חדש..</Link> }
        <ul>
          {this.posts().map(post => (
            <li key={ post.id }>
              <Post
                title={ post.title }
                text={ post.text }
                owner={{
                  name: this.ownerData(post.postedOn).name,
                  id: post.postedOn,
                }}
                author={{
                  name: this.ownerData(post.author).name,
                  id: post.author,
                }}
                createdAt={ post.createdAt }
                linkToOwner={ this.props.params.owner !== post.postedOn }
                linkToAuthor={ sliceAt(this.props.params.owner) !== post.author }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = Owner;
