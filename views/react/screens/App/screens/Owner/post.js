const React = require('react');
const marked = require('marked');
marked.setOptions({
  breaks: true
});

class Post extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    owner: React.PropTypes.shape({
      name: React.PropTypes.string
    }).isRequired,
  };

  render() {
    return (
      <article>
        <h1>{ this.props.title }</h1>
        <main dangerouslySetInnerHTML={{__html: marked(this.props.text)}} />
        <div>
          { this.props.owner.name }
        </div>
      </article>
    );
  }
}

module.exports = Post;
