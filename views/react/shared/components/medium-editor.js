const React = require('react');
const toMarkdown = require('to-markdown');

if (process.env.IS_WEBPACK) {
  var MediumEditor = require('medium-editor');
  require('medium-editor/dist/css/medium-editor.css');
  require('medium-editor/dist/css/themes/default.css');
}

class MediumMarkdownEditor extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  };

  componentDidMount() {
    const editor = React.findDOMNode(this.refs.editor);
    this.mediumEditor = new MediumEditor(editor, {
      placeholder: false
    });

    this.mediumEditor.subscribe('editableInput', this.onChange.bind(this));
  }

  componentWillUnmount() {
    if (!this.mediumEditor) return;
    this.mediumEditor.destroy();
  }

  onChange(ev) {
    const marked = toMarkdown(ev.target.innerHTML).trim();
    this.setState({ text: marked });
    if (this.props.onChange) {
      this.props.onChange(marked);
    }
  }

  render() {
    return (
      <div>
        { this.state.text === '' && <div style={{ position: 'absolute', zIndex: -1 }}>הטקסט שלך כאן...</div> }
        <div style={{ outline: 0 }} ref="editor" className='markdown-editor' />
      </div>
    );
  }
}

module.exports = MediumMarkdownEditor;
