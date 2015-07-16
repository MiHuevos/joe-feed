import React from 'react';
import marked from 'marked';
import FromNow from 'components/from-now';
import colors from 'utils/colors';
import LinkOrString from 'components/link-or-string';
import { Link } from 'react-router';
import Tappable from 'react-tappable';
import Icon from 'utils/icon';
import { deletePost } from 'flux/posts-actions';
import { listen } from 'flux';
marked.setOptions({
  breaks: true
});

@listen(['userData'])
class Post extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    owner: React.PropTypes.shape({
      name: React.PropTypes.string,
      id: React.PropTypes.string,
    }).isRequired,
    userData: React.PropTypes.shape({
      remoteUser: React.PropTypes.string,
      adGroups: React.PropTypes.array,
    }),
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

  static contextTypes = {
    flux: React.PropTypes.object,
  };

  onDelete() {
    this.context.flux.push(deletePost, { id: this.props.id });
  }

  render() {
    const showAuthor = this.props.author.name !== this.props.owner.name;
    const canEdit = (
      this.props.author.id === this.props.userData.remoteUser ||
      this.props.userData.adGroups.some(adGroup => adGroup === this.props.owner.id)
    );

    console.log(`can edit? ${canEdit}`);

    return (
      <article style={{
          margin: '1em 0',
      }}>
        <main
          style={{
            marginBottom: '0.4em',
            lineHeight: '1.6em',
          }}
          dangerouslySetInnerHTML={{__html: marked(this.props.text)}}
        />
        <div style={{ fontSize: '0.8em', textAlign: 'left', color: 'grey' }}>
          <Link to={`/${this.props.owner.id}/post-${this.props.id}`} style={{ color: colors.blue.darker }}>
            <FromNow date={ this.props.createdAt } />
          </Link>
          { ' ע"י ' }
          {
            showAuthor && (
              <LinkOrString toLink={ this.props.linkToAuthor } to={ `/@${this.props.author.id}`} linkColor={ colors.blue.darker } textColor='grey'>
                { this.props.author.name }
              </LinkOrString>
            )
          }
          { showAuthor && " בקבוצה " }
          {
            <LinkOrString toLink={ this.props.linkToOwner } to={ `/${this.props.owner.id}` } linkColor={ colors.blue.darker } textColor='grey'>
              { this.props.owner.name }
            </LinkOrString>
          }
          {
            canEdit && (
              <Tappable onTap={ this.onDelete.bind(this) }>
                <Icon name='delete' />
              </Tappable>
            )
          }
        </div>
      </article>
    );
  }
}

module.exports = Post;
