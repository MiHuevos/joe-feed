const React = require('react');
const Icon = require('utils/icon');
const Tappable = require('react-tappable');
const { listen } = require('flux');
const UserDataActions = require('flux/userdata-actions');

@listen('userData')
class Favorite extends React.Component {
  static propTypes = {
    userData: React.PropTypes.shape({
      favorites: React.PropTypes.array,
    }),
    owner: React.PropTypes.string,
    flux: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    this.props.flux.push(UserDataActions.toggleFavorite, this.props.owner);
  }

  render() {
    return (
      <Tappable onTap={ this.toggleFavorite }>
        <Icon
          color='orange'
          verticalAlign='bottom'
          name={
            this.props.userData.favorites.indexOf(this.props.owner) !== -1 ? (
              'star'
            ) : (
              'star-outline'
            )
          }
        />
      </Tappable>
    );
  }
}

module.exports = Favorite;
