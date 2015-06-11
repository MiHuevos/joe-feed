const React = require('react');
const { listen } = require('flux');

@listen('posts')
class Owner extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  render() {
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={ post.id }>{ post.title }</li>
        ))}
      </ul>
    );
  }
}

module.exports = Owner;
