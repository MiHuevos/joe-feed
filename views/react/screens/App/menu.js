const React = require('react');
const DynamicTransition = require('utils/dynamic-transition');
const colors = require('utils/colors');
const MenuOwnerItemList = require('./menu-owner-item-list');
const MenuHeader = require('./menu-header');
const Im = require('immutable');
const { listen } = require('flux');

@listen(['userData', 'owners'])
class Menu extends React.Component {
  static propTypes = {
    isOpened: React.PropTypes.bool,
    userData: React.PropTypes.object,
    owners: React.PropTypes.instanceOf(Im.Set),
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  render() {
    return (
      <DynamicTransition
        type="spring"
        animateFrom={{
          translateX: 500,
          opacity: 0,
        }}
        animateTo={{
          translateX: 0,
          opacity: 1,
        }}
        runTo={ this.props.isOpened ? 'finish' : 'start' }
        component='div'
        style={{
          height: '100%',
          position: 'absolute',
          backgroundColor: colors.blue.dark,
          color: colors.white.bright,
          width: '33%',
          paddingRight: 400,
          marginRight: -400,
          transform: 'translateX(50vw)',
          boxShadow: '0 0 10px rgba(0,0,0,.5)'
        }}
        animationProperties={{
          friction: 300,
          duration: 500,
        }}
      >
        <MenuHeader>
          המועדפים שלי
        </MenuHeader>
        <MenuOwnerItemList owners={ this.props.userData.favorites } />
        <MenuHeader>
          הקבוצות שלי
        </MenuHeader>
        <MenuOwnerItemList owners={ this.props.userData.adGroups } />
      </DynamicTransition>
    );
  }
}

module.exports = Menu;
