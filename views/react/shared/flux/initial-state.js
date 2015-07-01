var initialState = typeof window !== 'undefined' ? window.initialState : {};

module.exports = {
  posts: {},
  owners: [],
  userData: {},
  ...initialState,
};
