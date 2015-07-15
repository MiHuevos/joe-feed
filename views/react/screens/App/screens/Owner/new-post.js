const React = require('react');
const MediumEditor = require('components/medium-editor');
const PostActions = require('flux/posts-actions');
const { route } = require('flux');

@route
class NewPost extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.object,
  };
  static propTypes = {
    params: React.PropTypes.shape({
      owner: React.PropTypes.string.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      markdown: '',
    };
  }

  handleChangeData(markdown) {
    this.setState({ markdown });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.context.flux.push(PostActions.createPost, {
      owner: this.props.params.owner,
      markdown: this.state.markdown,
    }, (err, { postedOn, id }) => {
      this.context.router.transitionTo(`/${postedOn}/post-${id}`);
    });
  }

  render() {
    return (
      <form
        onSubmit={ this.onSubmit }
        action={ `/${this.props.params.owner}/new` }
        method='post'
        style={{
          display: 'block',
          marginBottom: '1em',
        }}
      >
        <MediumEditor onChange={ this.handleChangeData.bind(this) } />
        <button type='submit'>
          תן בראש
        </button>
      </form>
    );
  }
}

module.exports = NewPost;
