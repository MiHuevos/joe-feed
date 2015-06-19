const React = require('react');
const TopBar = require('./top-bar');

class App extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div style={{
        backgroundColor: '#f7f7f7',
        minHeight: '95vh',
        boxShadow: '0 0 5px rgba(0,0,0,0.4)',
      }}>
        <TopBar />
        { this.props.children }
      </div>
    );
  }
}

module.exports = App;
