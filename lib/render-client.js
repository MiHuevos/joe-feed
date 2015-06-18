const React = require('react');
const { Router } = require('react-router');
const Location = require('react-router/lib/Location');
const routes = require('../views/react/routes');
const Im = require('immutable');
const Flux = require('flux');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const r = require('rethinkdb');
const sliceAt = require('utils/slice-at');
const getOwners = require('./db/get-owners');
const arrToObj = require('utils/arr-to-obj');
const assign = require('react/lib/Object.assign');

// Simulate getting a post from the db
const getPostsFrom = (userOrGroup) => {
  return r.table('posts').filter({
    postedOn: userOrGroup,
  }).run(r.conn).then(results => results.toArray()).then(arrToObj);
};

const getOwnersForPosts = (posts) => {
  var authors = Object.keys(posts).map(postId => posts[postId].author);
  console.log(authors);
  return getOwners(authors);
};

const createFlux = (flux, { posts, owners, remoteUser }) => {
  flux.start();
  flux.replace({
    posts,
    owners
  });
  flux.set('userData', Im.fromJS({
    remoteUser: remoteUser
  }));
  return flux;
};

const getData = (components, state) => {
  console.log(components[0]);
  return getPostsFrom(state.params.owner).then(posts => {
    return Promise.all([
      getOwnersForPosts(Object.assign(posts, { '123123123': { author: sliceAt(state.params.owner) } })),
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
      createFlux(flux, { posts, owners, remoteUser: req.remoteUser });
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
