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
      <article style={{
          margin: '1em 0',
      }}>
        <h1 style={{ marginBottom: '0.2em' }}>{ this.props.title }</h1>
        <main dangerouslySetInnerHTML={{__html: marked(this.props.text)}} />
        <div style={{ fontSize: '0.8em', textAlign: 'left' }}>
          {this.props.author.name !== this.props.owner.name && `${this.props.author.name} @ ` }
          { this.props.owner.name }
        </div>
      </article>
    );
  }
}

module.exports = Post;
