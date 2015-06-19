const React = require('react');
const colors = require('utils/colors');
const { listen } = require('flux');
const Icon = require('utils/icon');

@listen(['userData'])
class TopBar extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: colors.blue.dark,
          color: colors.white.bright,
          display: 'flex'
        }}
      >
        <span style={{
          flex: '0 0 auto',
          padding: '0.5em',
        }}>
          <Icon name="menu" size="1.3" />
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
