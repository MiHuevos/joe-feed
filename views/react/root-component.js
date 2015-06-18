const React = require('react');
const App = require('./screens/App');

class Root extends React.Component {
  static propTypes = {
    route: React.PropTypes.object,
  };

  static childContextTypes = {
    flux: React.PropTypes.object,
  };

  getChildContext() {
    return {
      flux: this.props.route.flux,
    };
  };

  render() {
    return <App {...this.props} />;
  }
}

module.exports = Root;
