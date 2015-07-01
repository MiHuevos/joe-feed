const React = require('react');

class MenuHeader extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <h2
        style={{
          paddingRight: '0.3em',
          paddingTop: '0.2em',
        }}
      >
        { this.props.children }
      </h2>
    );
  }
}

module.exports = MenuHeader;
