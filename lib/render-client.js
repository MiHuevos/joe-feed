const React = require('react');
const Router = require('react-router');
const routes = require('../views/react/routes');
const Im = require('immutable');
const Flux = require('flux');

// Sample the db
const db = {
  owners: [{
    id: 'gal',
    name: 'Gal Schlezinger',
    type: 'user'
  }, {
    id: 'magma',
    name: 'The Magma Team',
    type: 'group'
  }],
  posts: [{
    id: 'something',
    title: 'this is gal post',
    text: `
Today I walked the park.
it was *great*adsf
asdf
asd
fromasdf
asfasdf
asdf
asdf
sdfasdfasdf
adfasdfasfasdf
sdfasdfasdffssfasd
fsdafsf
sfsdfdfsfsafd
asdfasdfasd
    `,
    owner: {
      type: 'user',
      name: 'gal'
    }
  }, {
    id: 'kaki',
    title: 'this is my post',
    text: `
    This is a group!
    `,
    owner: {
      type: 'group',
      name: 'magma'
    }
  }]
};

// Simulate getting a post from the db
const getPostsFrom = (userOrGroup) => {
  return new Promise((resolve) => {
    var search = userOrGroup.charAt(0) === '@' ? {
      owner: {
        type: 'user',
        name: userOrGroup.slice(1),
      }
    } : {
      owner: {
        type: 'group',
        name: userOrGroup,
      }
    };

    resolve(db.posts.filter(post => (
      post.owner.type === search.owner.type && post.owner.name === search.owner.name
    )));
  });
};

const getOwnerData = (userOrGroup) => {
  return new Promise((resolve) => {
    var search = userOrGroup.charAt(0) === '@' ? {
      type: 'user',
      id: userOrGroup.slice(1),
    } : {
      type: 'group',
      id: userOrGroup,
    };
    resolve(db.owners.filter(owner => owner.id === search.id && owner.type === search.type));
  });
};

module.exports = (req, res, next) => {
  Router.run(routes, req.url, (Handler, state) => {
    Promise.all([getOwnerData(state.params.owner), getPostsFrom(state.params.owner)]).then(results => {
      const [owners, posts] = results;
      if (!posts) {
        return next();
      }
      var flux = new Flux();
      flux.start();
      flux.set('posts', Im.fromJS(posts || []));
      flux.set('owners', Im.fromJS(owners || []));
      res.send(React.renderToString(<Handler flux={ flux } />));
    }).catch(err => {
      console.log(err, err.stack);
      res.status(500).send(err);
    });
  });
};
