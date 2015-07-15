const React = require('react');
const toMarkdown = require('to-markdown');

if (process.env.IS_WEBPACK) {
  var MediumEditor = require('medium-editor');
  require('medium-editor/dist/css/medium-editor.css');
  require('medium-editor/dist/css/themes/default.css');
}

const initialText = '<h2>כותרת</h2><p>תוכן...</p>';

class MediumMarkdownEditor extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    currentRoutes: React.PropTypes.array,
    isDisabled: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.focusOnEditor = this.focusOnEditor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      text: toMarkdown(initialText),
      javascriptEnabled: false,
    };
  };

  componentDidMount() {
    this.setState({
      javascriptEnabled: true,
    });
    this.initializeMediumEditorElement();
    this.onChange();
  }

  initializeMediumEditorElement() {
    const editor = React.findDOMNode(this.refs.editor);
    this.mediumEditor = new MediumEditor(editor, {
      placeholder: false,
      toolbar: {
        diffLeft: -10,
      },
    });
    editor.innerHTML = initialText;
    this.mediumEditor.subscribe('editableDrop', this.onChange);
    this.mediumEditor.subscribe('editableInput', this.onChange);
    return editor;
  }

  componentWillUnmount() {
    if (!this.mediumEditor) return;
    this.mediumEditor.destroy();
  }

  onChange() {
    setTimeout(() => {
      const marked = toMarkdown(this.mediumEditor.serialize()['element-0'].value).trim();
      this.setState({ text: marked });
      if (this.props.onChange) {
        this.props.onChange(marked);
      }
    }, 10);
  }

  focusOnEditor() {
    React.findDOMNode(this.refs.editor).focus();
  }

  placeHolder() {
    return (
      <div
        onClick={ this.focusOnEditor }
        style={{
          color: '#666',
          position: 'absolute',
          right: 0,
          top: 0
        }}
      >
        הטקסט שלך כאן...
      </div>
    );
  }

  render() {
    return (
      <div style={{
        margin: '0.3em',
        padding: '0.3em',
        backgroundColor: '#fff',
      }}>
        <textarea
          style={{
            display: this.state.javascriptEnabled ? 'none' : 'block',
            width: '100%',
            border: 0,
            fontFamily: 'Arial',
            outline: 0,
            fontSize: '100%',
          }}
          disabled={ this.props.isDisabled }
          defaultValue={toMarkdown(initialText)}
          name='markdown'
        />
        <div style={{
          position: 'relative',
          display: this.state.javascriptEnabled ? 'block' : 'none',
        }}>
          <div
            style={{
              outline: 0,
            }}
            ref="editor"
            className='markdown-editor'
          />
          { this.state.text === '' && this.placeHolder() }
        </div>
      </div>
    );
  }
}

module.exports = MediumMarkdownEditor;
