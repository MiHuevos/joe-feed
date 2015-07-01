const Im = require('immutable');
const initialState = require('flux/initial-state');
const OwnersActions = require('flux/owners-actions');

module.exports = {
  getInitialState() {
    return Im.fromJS(initialState.owners).toSet();
  },
  register() {
    return {
      [OwnersActions.fetchOwnersData]: this.ownersFetched,
    };
  },
  serialize(state) {
    return state.toJS();
  },
  deserialize(data) {
    return Im.fromJS(data).toSet();
  },
  ownersFetched(state, dataReceived) {
    return state.merge(Im.fromJS(dataReceived));
  },
};
