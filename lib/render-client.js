const React = require('react');
const { Router } = require('react-router');
const Location = require('react-router/lib/Location');
const routes = require('../views/react/routes');
const Flux = require('flux');
const Promise = require('bluebird');
const sliceAt = require('utils/slice-at');
const getOwners = require('./db/get-owners');
const getPosts = require('./db/get-posts');
const arrToObj = require('utils/arr-to-obj');

const getOwnersForPosts = (posts) => {
  var authors = Object.keys(posts).map(postId => posts[postId].author).concat(
    Object.keys(posts).filter(postId => posts[postId].postedOn).map(postId => sliceAt(posts[postId].postedOn))
  ).filter(exists => exists);
  return getOwners(authors);
};

const createFlux = (flux, { posts, owners, userData }) => {
  flux.start();
  flux.replace({
    posts,
    owners,
    userData
  });
  return flux;
};

const getData = (components, state) => {
  // TODO: console.log(components[0]);
  return getPosts({ owner: state.params.owner }).then(arrToObj).then(posts => {
    return Promise.all([
      getOwnersForPosts([{ author: sliceAt(state.params.owner), postedOn: state.params.owner }].concat(posts)),
      posts
    ]).spread((owners, posts) => ({ owners, posts }));
  });
};

const runReact = ({ location, userData }) => {
  return new Promise((resolve, reject) => {
    const flux = new Flux();
    Router.run(routes({ flux }), location, (error, routerState) => {
      if (!routerState.components.length) return reject(new Error('not found'));
      getData(routerState.components, routerState).then(({ owners, posts }) => {
        if (!posts) {
          return reject(new Error('not found'));
        }
        createFlux(flux, { posts, owners, userData });
        resolve({
          flux,
          routerState,
          prerenderedReact: React.renderToString(<Router {...routerState} flux={ flux } />)
        });
      });
    });
  });
};

module.exports = (req, res, next) => {
  runReact({
    location: new Location(req.path, req.query),
    userData: {
      remoteUser: req.remoteUser,
      adGroups: req.adGroups,
      userTitle: req.userTitle,
    },
  }).then(({ prerenderedReact, flux }) => {
    res.render('react', {
      prerenderedReact,
      anotherKaki: flux.toJSON(),
      scriptName: req.webpackStats.assetsByChunkName.main[0],
    });
  }).catch(err => {
    if (err.message === 'not found') return next;
    console.log(err.stack);
    res.status(500).send(err);
  });
};
