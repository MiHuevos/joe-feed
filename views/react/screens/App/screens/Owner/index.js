const React = require('react');
const { route, listen } = require('flux');
const Im = require('immutable');
const PostList = require('./post-list');
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
      (
        !this.props.params.postId ||
        this.props.params.postId === post.get('id')
      ) && (
        post.get('postedOn') === this.props.params.owner ||
        post.get('author') === sliceAt(this.props.params.owner)
      )
    )).valueSeq().sort((postA, postB) => {
      const timeA = moment(postA.get('createdAt'));
      const timeB = moment(postB.get('createdAt'));
      if (timeA.isBefore(timeB)) {
        return 1;
      } else if (timeB.isBefore(timeA)) {
        return -1;
      } else {
        return 0;
      }
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
        { canEdit && (!this.props.children ? (
            <Link to={`/${this.props.params.owner}/new`}>משהו חדש..</Link>
          ) : (
            <Link to={`/${this.props.params.owner}`}>חזרה לזרם</Link>
          ))
        }
        {
          canEdit && this.props.children && (
            <div
              style={{
                marginTop: '1em',
              }}
            >
              <h2>
                הודעה חדשה
              </h2>
              { this.props.children }
            </div>
          )
        }
        { (!canEdit || (!this.props.children)) &&
          <PostList
            owner={ this.props.params.owner }
            posts={ this.posts() }
          />
        }
      </div>
    );
  }
}

module.exports = Owner;
