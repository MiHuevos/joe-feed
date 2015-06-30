const React = require('react');
const MediumEditor = require('components/medium-editor');

class NewPost extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      owner: React.PropTypes.string.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
    };
  }

  handleChangeData(markdown) {
    this.setState({ markdown });
  }

  onSubmit(ev) {
    ev.preventDefault();
    console.log(`Generated markdown for ${this.props.params.owner}:`, this.state.markdown);
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
