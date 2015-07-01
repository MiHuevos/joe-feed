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
          this.props.owners.map((owner, i) => {
            return (
              <MenuOwnerItem key={ owner } isAlternated={ i % 2 === 1 } owner={ owner } />
            );
          })
        }
      </div>
    );
  }
}

module.exports = MenuOwnerItemList;
