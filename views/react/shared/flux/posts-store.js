const Im = require('immutable');
const initialState = require('flux/initial-state');
const PostsActions = require('flux/posts-actions');

module.exports = {
  getInitialState() {
    return Im.fromJS(initialState.posts);
  },
  register() {
    return {
      [PostsActions.fetchPostsData]: this.fetchedPosts,
      [PostsActions.createPost]: this.postCreated,
    };
  },
  serialize(state) {
    return state.toJS();
  },
  deserialize(data) {
    return Im.fromJS(data);
  },
  fetchedPosts(state, fetchPosts) {
    return state.merge(Im.fromJS(fetchPosts));
  },
  postCreated(state, createdPost) {
    if (createdPost.uniqueId) console.log('override!');
    var newState = !createdPost.uniqueId ? state : state.remove(createdPost.uniqueId);
    return newState.merge(Im.fromJS({
      [createdPost.id]: createdPost
    }));
  },
};
