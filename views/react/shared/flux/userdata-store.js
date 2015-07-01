const Actions = require('./userdata-actions');

module.exports = {
  getInitialState() {
    return {};
  },
  register() {
    return {
      [Actions.toggleFavorite]: this.favoriteToggled,
    };
  },
  favoriteToggled(state, favorites) {
    return {
      ...state,
      favorites
    };
  },
};
