const React = require('react');
const colors = require('utils/colors');
const { listen } = require('flux');
const Icon = require('utils/icon');
const Tappable = require('react-tappable');

@listen(['userData'])
class TopBar extends React.Component {
  static propTypes = {
    userData: React.PropTypes.shape({
      userTitle: React.PropTypes.string
    }),
    onMenuToggle: React.PropTypes.func,
  };

  static defaultProps = {
    onMenuToggle: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      runTo: 'start',
    };
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: colors.blue.dark,
          color: colors.white.bright,
          display: 'flex',
          zIndex: 1,
        }}
      >
        <span style={{
          flex: '0 0 auto',
          padding: '0.5em',
        }}>
          <Tappable
            onTap={ this.props.onMenuToggle }
            name="menu"
          >
            <Icon name="menu" size="1.3" />
          </Tappable>
          {' '}
          <span
            style={{
              verticalAlign: 'middle',
            }}
          >
            { this.props.userData.userTitle }
          </span>
        </span>
      </div>
    );
  }
}

module.exports = TopBar;
