const React = require('react');
const TopBar = require('./top-bar');
const colors = require('utils/colors');
const DynamicTransition = require('utils/dynamic-transition');

class App extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.object),
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.state = {
      isMenuToggled: false,
    };
  }

  onMenuToggle() {
    this.setState({
      isMenuToggled: !this.state.isMenuToggled,
    });
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
        <TopBar onMenuToggle={ this.onMenuToggle } />
        <div
          style={{
            position: 'relative',
            flex: 1,
          }}
        >
          <DynamicTransition
            type="spring"
            animateFrom={{
              translateX: '50vw',
              opacity: 0,
            }}
            animateTo={{
              translateX: 40,
              opacity: 1,
            }}
            runTo={ this.state.isMenuToggled ? 'finish' : 'start' }
            component='div'
            style={{
              height: '100%',
              position: 'absolute',
              backgroundColor: colors.blue.dark,
              color: colors.white.bright,
              width: '33%',
              paddingRight: 40,
              opacity: 0,
              boxShadow: '0 0 10px rgba(0,0,0,.5)'
            }}
            animationProperties={{
              friction: 300,
              duration: 500,
            }}
          >
            <button
              style={{
                background: 'transparent',
                color: 'white',
                display: 'block',
                border: 0,
                width: '100%',
                outline: 0,
              }}
              onClick={ () => alert('hello.') }
            >
              Menu Item.
            </button>
          </DynamicTransition>
          { this.props.children }
        </div>
      </div>
    );
  }
}

module.exports = App;
