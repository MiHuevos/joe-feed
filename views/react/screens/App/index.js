const React = require('react');
const { listen } = require('flux');
const { RouteHandler } = require('react-router');

class App extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  render() {
    return (
      <div>
        <h2>
          welcome to the app
        </h2>
        <RouteHandler />
      </div>
    );
  }
}

module.exports = App;
