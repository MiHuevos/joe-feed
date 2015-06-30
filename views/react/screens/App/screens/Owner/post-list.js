const React = require('react');
const Post = require('./post');
const Im = require('immutable');
const sliceAt = require('utils/slice-at');
const { listen } = require('flux');

@listen('owners')
class PostList extends React.Component {
  static propTypes = {
    owner: React.PropTypes.string,
    owners: React.PropTypes.instanceOf(Im.Set),
    posts: React.PropTypes.array,
  };

  ownerData(ownerId) {
    const ownerData = this.props.owners.filter(owner => (
      owner.get('id') === sliceAt(ownerId)
    )).first();
    return ownerData ? ownerData.toJS() : {};
  }

  render() {
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={ post.id }>
            <Post
              id={ post.id }
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
              linkToOwner={ this.props.owner !== post.postedOn }
              linkToAuthor={ sliceAt(this.props.owner) !== post.author }
            />
          </li>
        ))}
      </ul>
    );
  }
}

module.exports = PostList;
