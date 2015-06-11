const React = require('react');
const App = require('./screens/App');

class Root extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    flux: React.PropTypes.object,
  };

  getChildContext() {
    return {
      flux: this.props.flux,
    };
  };

  render() {
    return <App />;
  }
}

module.exports = Root;
