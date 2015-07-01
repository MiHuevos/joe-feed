const React = require('react');
const TopBar = require('./top-bar');
const Menu = require('./menu');

class App extends React.Component {
  static childContextTypes = {
    closeMenu: React.PropTypes.func,
    openMenu: React.PropTypes.func,
  };

  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      isMenuToggled: false,
    };
  }

  getChildContext() {
    return {
      closeMenu: this.closeMenu
    };
  }

  onMenuToggle() {
    this.setState({
      isMenuToggled: !this.state.isMenuToggled,
    });
  }

  closeMenu() {
    this.setState({ isMenuToggled: false });
  }

  render() {
    return (
      <div style={{
        backgroundColor: '#f7f7f7',
        minHeight: '95vh',
        boxShadow: '0 0 5px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}>
        <TopBar closeMenu={ this.closeMenu } onMenuToggle={ this.onMenuToggle } />
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
          }}
        >
          <Menu isOpened={ this.state.isMenuToggled } />
          <div
            onClick={ this.closeMenu }
            style={{
              flex: 1,
            }}
          >
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

module.exports = App;
