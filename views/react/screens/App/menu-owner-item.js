const React = require('react');
const Im = require('immutable');
const ownerData = require('utils/owner-data');
const MenuItem = require('./menu-item');
const { listen } = require('flux');

@listen(['owners'])
class MenuOwnerItem extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    closeMenu: React.PropTypes.func,
  };

  static propTypes = {
    owner: React.PropTypes.string,
    owners: React.PropTypes.instanceOf(Im.Set),
  };

  transitionTo() {
    setTimeout(() => this.context.router.transitionTo(`/${this.props.owner}`), 10);
    this.context.closeMenu();
  }

  render() {
    return (
      <MenuItem
        onTap={ this.transitionTo.bind(this) }
      >
        { ownerData({ owner: this.props.owner, owners: this.props.owners }).name }
      </MenuItem>
    );
  }
}

module.exports = MenuOwnerItem;
