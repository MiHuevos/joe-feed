const React = require('react');
const { listen } = require('flux');
const { RouteHandler } = require('react-router');

class App extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <h2>
          welcome to the app
        </h2>
        <RouteHandler params={ this.props.params } />
      </div>
    );
  }
}

module.exports = App;
