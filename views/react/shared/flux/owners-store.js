const Im = require('immutable');
const OwnersActions = require('flux/owners-actions');

module.exports = {
  getInitialState() {
    return Im.Set();
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
