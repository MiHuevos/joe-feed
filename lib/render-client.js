const React = require('react');
const Router = require('react-router');
const routes = require('../views/react/routes');

const Flux = require('flux');

// Sample the db
const db = {
  'users': {
    'gal': [{
      id: 'something',
      title: 'this is gal post'
    }]
  },
  'groups': {
    'magma': [{
      id: 'kaki',
      title: 'this is my post'
    }]
  }
};

// Simulate getting a post from the db
const getPostsFrom = (userOrGroup) => {
  return new Promise((resolve) => {
    var isUser = userOrGroup.charAt(0) === '@';
    if (isUser) {
      resolve(db.users[userOrGroup.toLowerCase().slice(1)]);
    }
    resolve(db.groups[userOrGroup.toLowerCase()]);
  });
};

module.exports = (req, res, next) => {
  Router.run(routes, req.url, (Handler, state) => {
    getPostsFrom(state.params.owner).then(posts => {
      if (!posts) {
        return next();
      }
      var flux = new Flux();
      flux.start();
      flux.set('posts', posts);
      res.send(React.renderToString(<Handler flux={ flux } />));
    });
  });
};
