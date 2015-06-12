const React = require('react');
const App = require('./screens/App');

class Root extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.func
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
    return <App params={ this.context.router.getCurrentParams() } />;
  }
}

module.exports = Root;
