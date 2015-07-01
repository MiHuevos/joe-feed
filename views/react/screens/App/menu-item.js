const React = require('react');
const Tappable = require('react-tappable');

class MenuItem extends React.Component {
  static propTypes = {
    onTap: React.PropTypes.func,
    children: React.PropTypes.node,
    isAlternated: React.PropTypes.bool,
  };

  render() {
    return (
      <Tappable
        component='button'
        style={{
          background: this.props.isAlternated ? 'rgba(0,0,0,.10)' : 'transparent',
          color: 'white',
          display: 'block',
          border: 0,
          width: '100%',
          outline: 0,
          fontSize: '1em',
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
