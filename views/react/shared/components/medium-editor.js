const React = require('react');
const MediumEditor = require('medium-editor');
const MarkdownExtension = require('medium-editor-markdown');

class MediumEditor extends React.Component {
  componentDidMount() {
    const editor = React.findDOMNode(this.refs.editor);
    this.mediumEditor = new MediumEditor(editor, {
      placeholder: 'hagever',
      extensions: {
        markdown: new MarkdownExtension(innerMarkdown => this.onChange(innerMarkdown))
      }
    });
  }

  componentWillUnmount() {
    if (!this.mediumEditor) return;
    this.mediumEditor.destroy();
  }

  onChange(markdown) {
    console.log(markdown);
  }

  render() {
    return (
      <div ref="editor" />
    );
  }
}

module.exports = MediumEditor;
