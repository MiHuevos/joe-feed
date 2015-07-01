const React = require('react');
const Tappable = require('react-tappable');

class MenuItem extends React.Component {
  static propTypes = {
    onTap: React.PropTypes.func,
    children: React.PropTypes.node,
  };

  render() {
    return (
      <Tappable
        component='button'
        style={{
          background: 'transparent',
          color: 'white',
          display: 'block',
          border: 0,
          width: '100%',
          outline: 0,
          paddingTop: '0.4em',
          paddingBottom: '0.4em',
        }}
        onTap={ this.props.onTap }
      >
        { this.props.children }
      </Tappable>
    );
  }
}

module.exports = MenuItem;
