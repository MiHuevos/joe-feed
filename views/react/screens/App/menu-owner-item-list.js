const React = require('react');
const MenuOwnerItem = require('./menu-owner-item');

class MenuOwnerItemList extends React.Component {
  static propTypes = {
    owners: React.PropTypes.array,
  };

  render() {
    return (
      <div>
        {
          this.props.owners.map(owner => {
            return (
              <MenuOwnerItem key={ owner } owner={ owner } />
            );
          })
        }
      </div>
    );
  }
}

module.exports = MenuOwnerItemList;
