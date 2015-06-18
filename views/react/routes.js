const { Route } = require('react-router');
const React = require('react');
const RootComponent = require('./root-component');
const Owner = require('./screens/App/screens/Owner');
const sliceAt = require('utils/slice-at');
const Im = require('immutable');
const OwnersActions = require('flux/owners-actions');
const PostsActions = require('flux/posts-actions');

const getAuthorData = (authors) => {
  return Promise.resolve([{
    id: 'gal',
    name: 'גל שלזינגר'
  }]);
};

const loadPostsAuthorsAndOwnersIfTheyDoesntExistOn = ({ flux }) => {
  return (nextState, transition) => {
    const ownerId = sliceAt(nextState.params.owner);
    const ownerInfo = flux.get('owners').filter(owner => owner.get('id') === ownerId);
    const posts = flux.get('posts').filter(post => (
      post.get('postedOn') === nextState.params.owner ||
      post.get('author') === ownerId
    ));

    if (!ownerInfo.size) {
      flux.push(OwnersActions.fetchOwnersData, [ownerId]);
    }

    if (!posts.size) {
      flux.push(PostsActions.fetchPostsData, nextState.params.owner);
    }
  };
};

module.exports = ({ flux, shouldListen }) => (
  <Route name='root' path='/' flux={ flux } component={ RootComponent }>
    <Route onEnter={ shouldListen && loadPostsAuthorsAndOwnersIfTheyDoesntExistOn({ flux }) } name='owner' path='/:owner' flux={ flux } component={ Owner } />
  </Route>
);
