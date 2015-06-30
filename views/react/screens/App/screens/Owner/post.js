const React = require('react');
const marked = require('marked');
const FromNow = require('components/from-now');
const LinkOrString = require('components/link-or-string');
const { Link } = require('react-router');
marked.setOptions({
  breaks: true
});

class Post extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    owner: React.PropTypes.shape({
      name: React.PropTypes.string,
      id: React.PropTypes.string,
    }).isRequired,
    author: React.PropTypes.shape({
      name: React.PropTypes.string,
      id: React.PropTypes.string,
    }),
    linkToOwner: React.PropTypes.bool,
    linkToAuthor: React.PropTypes.bool,
    createdAt: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  };

  render() {
    const showAuthor = this.props.author.name !== this.props.owner.name;

    return (
      <article style={{
          margin: '1em 0',
      }}>
        <main
          style={{
            marginBottom: '0.4em',
          }}
          dangerouslySetInnerHTML={{__html: marked(this.props.text)}}
        />
        <div style={{ fontSize: '0.8em', textAlign: 'left' }}>
          <Link to={`/${this.props.owner.id}/post-${this.props.id}`}>
            <FromNow date={ this.props.createdAt } />
          </Link>
          { ' ע"י ' }
          {
            showAuthor && (
              <LinkOrString toLink={ this.props.linkToAuthor } to={ `/@${this.props.author.id}`}>
                { this.props.author.name }
              </LinkOrString>
            )
          }
          { showAuthor && " בקבוצה " }
          {
            <LinkOrString toLink={ this.props.linkToOwner } to={ `/${this.props.owner.id}` }>
              { this.props.owner.name }
            </LinkOrString>
          }
        </div>
      </article>
    );
  }
}

module.exports = Post;
