const { Route } = require('react-router');
const React = require('react');
const RootComponent = require('./root-component');
const Owner = require('./screens/App/screens/Owner');
const sliceAt = require('utils/slice-at');
const OwnersActions = require('flux/owners-actions');
const PostsActions = require('flux/posts-actions');

const moment = require('moment');
var lastCheckedForPosts = {};

const loadPostsAuthorsAndOwnersIfTheyDoesntExistOn = ({ flux }) => {
  return (nextState) => {
    const ownerId = sliceAt(nextState.params.owner);
    const ownerInfo = flux.get('owners').filter(owner => owner.get('id') === ownerId);
    const posts = flux.get('posts').filter(post => (
      post.get('postedOn') === nextState.params.owner ||
      post.get('author') === ownerId
    ));
    const owners = flux.get('owners').map(o => o.get('id'));
    const unknownAuthors = posts.valueSeq().map(post => post.get('author')).concat(
      posts.valueSeq().map(post => sliceAt(post.get('postedOn')))
    ).filterNot(e => {
      return owners.has(e) || e === nextState.params.owner;
    });

    if (!ownerInfo.size) {
      flux.push(OwnersActions.fetchOwnersData, [ownerId]);
    }

    if (!lastCheckedForPosts[nextState.params.owner] || moment(Date.now()).diff(lastCheckedForPosts[nextState.params.owner], 'seconds') > 2) {
      flux.push(PostsActions.fetchPostsData, nextState.params.owner);
      lastCheckedForPosts[nextState.params.owner] = Date.now();
    }

    if (unknownAuthors.count()) {
      flux.push(OwnersActions.fetchOwnersData, unknownAuthors.toJS());
    }
  };
};

module.exports = ({ flux, shouldListen }) => (
  <Route name='root' path='/' flux={ flux } component={ RootComponent }>
    <Route
      onEnter={ shouldListen && loadPostsAuthorsAndOwnersIfTheyDoesntExistOn({ flux }) }
      name='owner'
      path='/:owner'
      flux={ flux }
      component={ Owner }
    />
  </Route>
);
