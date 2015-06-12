const React = require('react');
const { listen } = require('flux');
const Im = require('immutable');
const Post = require('./post');

@listen(['posts', 'owners'])
class Owner extends React.Component {
  static propTypes = {
    posts: React.PropTypes.instanceOf(Im.List),
    owners: React.PropTypes.instanceOf(Im.List),
    params: React.PropTypes.object.isRequired,
  };

  ownerSearchInfo() {
    const owner = this.props.params.owner;
    const isUser = owner.charAt(0) === '@';
    return {
      type: isUser ? 'user' : 'group',
      name: isUser ? owner.slice(1) : owner
    };
  }

  ownerData() {
    const ownerSearchInfo = this.ownerSearchInfo();
    return this.props.owners.filter(owner => (
      owner.get('id') === ownerSearchInfo.name && owner.get('type') === ownerSearchInfo.type
    )).first().toJS();
  }

  posts() {
    var ownerSearchInfo = this.ownerSearchInfo();
    return this.props.posts.filter(post => (
      post.get('owner').get('type') === ownerSearchInfo.type && post.get('owner').get('name') === ownerSearchInfo.name
    )).toJS();
  }

  render() {
    const { name } = this.ownerData();

    return (
      <div>
        <h2>Posts by { name }</h2>
        <ul>
          {this.posts().map(post => (
            <li>
              <Post
                key={ post.id }
                title={ post.title }
                text={ post.text }
                owner={{
                  name: this.ownerData().name
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
