const Actions = require('./userdata-actions');
const initialState = require('flux/initial-state');

module.exports = {
  getInitialState() {
    return initialState.userData;
  },
  register() {
    return {
      [Actions.toggleFavorite]: this.favoriteToggled,
    };
  },
  favoriteToggled(state, favorites) {
    console.log(state, favorites);
    return {
      ...state,
      favorites
    };
  },
};
