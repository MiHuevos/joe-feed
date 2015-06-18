const React = require('react');
const { listen } = require('flux');

class App extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <h2>
          welcome to the app
        </h2>
        { this.props.children }
      </div>
    );
  }
}

module.exports = App;
