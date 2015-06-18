const React = require('react');
const { Router } = require('react-router');
const Location = require('react-router/lib/Location');
const routes = require('../views/react/routes');
const Flux = require('flux');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const sliceAt = require('utils/slice-at');
const getOwners = require('./db/get-owners');
const getPosts = require('./db/get-posts');
const arrToObj = require('utils/arr-to-obj');

const getOwnersForPosts = (posts) => {
  var authors = Object.keys(posts).map(postId => posts[postId].author).concat(
    Object.keys(posts).map(postId => sliceAt(posts[postId].postedOn))
  );
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
      getOwnersForPosts(posts),
      posts
    ]);
  });
};

module.exports = (req, res, next) => {
  var location = new Location(req.path, req.query);
  const flux = new Flux();
  Router.run(routes({ flux }), location, (error, state) => {
    getData(state.components, state).spread((owners, posts) => {
      if (!posts) {
        return next();
      }
      createFlux(flux, { posts, owners, userData: { remoteUser: req.remoteUser } });
      var view = path.resolve(__dirname, '../views/react.ejs');
      const webpackStats = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../webpack.stats.json')));
      res.render(view, {
        kaki: React.renderToString(<Router {...state} flux={ flux } />),
        anotherKaki: flux.toJSON(),
        scriptName: webpackStats.assetsByChunkName.main,
      });
    }).catch(err => {
      console.log(err.stack);
      res.status(500).send(err);
    });
  });
};
