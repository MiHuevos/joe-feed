const React = require('react');
const MediumEditor = require('components/medium-editor');

class NewPost extends React.Component {
  handleChangeData(markdown) {
    console.log(markdown);
  }

  render() {
    return (
      <div style={{
        marginBottom: '1em',
      }}>
        <MediumEditor onChange={ this.handleChangeData } />
      </div>
    );
  }
}

module.exports = NewPost;
