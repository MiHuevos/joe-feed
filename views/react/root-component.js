const React = require('react');
const App = require('./screens/App');
const { route } = require('flux');

@route
class Root extends React.Component {
  static propTypes = {
    route: React.PropTypes.object,
  };

  render() {
    return <App {...this.props} />;
  }
}

module.exports = Root;
