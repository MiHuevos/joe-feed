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
    currentRoutes: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.focusOnEditor = this.focusOnEditor.bind(this);
    this.state = {
      text: '',
      javascriptEnabled: false,
    };
  };

  componentDidMount() {
    this.setState({
      javascriptEnabled: true,
    });
    const editor = React.findDOMNode(this.refs.editor);
    this.mediumEditor = new MediumEditor(editor, {
      placeholder: false
    });
    editor.innerHTML = "<h2>שלום</h2><p>כתבו פה דברים טובים</p>";
    this.onChange({ target: { innerHTML: editor.innerHTML }});

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
          placeholder='הטקסט שלך כאן...'
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
