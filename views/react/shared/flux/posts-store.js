const Im = require('immutable');
const PostsActions = require('flux/posts-actions');

module.exports = {
  getInitialState() {
    return Im.Map();
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
    return state.merge(Im.fromJS({
      [createdPost.id]: createdPost
    }));
  },
};
