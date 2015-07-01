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

const getData = (components, state, userData) => {
  // TODO: console.log(components[0]);
  return getPosts({ owner: state.params.owner }).then(arrToObj).then(posts => {
    return Promise.all([
      getOwnersForPosts({
        ...posts,
        kakes: { author: sliceAt(state.params.owner), owner: state.params.owner }
      }),
      posts,
      getOwners(userData.remoteUser),
    ]).spread((owners, posts, userInfo) => (
      Promise.all([
        owners,
        posts,
        userInfo[0],
        getOwners(userInfo[0].favorites),
      ])
    )).spread((owners, posts, userInfo, favoriteOwners) => {
      return ({
        owners: owners.concat(favoriteOwners),
        posts,
        userInfo
      });
    });
  });
};

const runReact = ({ location, userData }) => {
  return new Promise((resolve, reject) => {
    const flux = new Flux();
    Router.run(routes({ flux }), location, (error, routerState) => {
      if (!routerState.components.length) return reject(new Error('not found'));
      getData(routerState.components, routerState, userData).then(({ owners, posts, userInfo }) => {
        if (!posts) {
          return reject(new Error('not found'));
        }
        createFlux(flux, { posts, owners, userData: { ...userData, ...userInfo } });
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
      favorites: [],
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
