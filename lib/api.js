const { Router } = require('express');
const getPosts = require('./db/get-posts');
const getOwners = require('./db/get-owners');
const toggleFavorite = require('./db/toggle-favorite');
const createPost = require('./db/create-post');
const isUserOrInGroupPolicy = require('./policies/is-user-or-in-group');
const arrToObj = require('utils/arr-to-obj');

const api = Router();

api.get('/posts', (req, res, next) => {
  const owner = req.query.ownerId;
  if (!owner) return next();
  getPosts({ owner }).then(arrToObj).then(posts => {
    res.send({
      posts
    });
  }).catch(err => {
    res.status(500).send({ error: 'an error occured', err });
  });
});
api.post('/posts', isUserOrInGroupPolicy({ ownerInParams: false }));
api.post('/posts', (req, res) => {
  createPost({
    markdown: req.body.markdown,
    remoteUser: req.remoteUser,
    owner: req.body.owner,
  }).then((post) => {
    res.send({ post });
  }).catch(err => {
    console.log('error while creating post', err);
    res.status(err.status).send({ ...err });
  });
});

api.put('/favorites', (req, res) => {
  toggleFavorite({
    user: req.remoteUser,
    owner: req.body.owner,
    toFavorite: req.body.toFavorite,
  }).then(favorites => {
    res.send({favorites});
  }).catch(err => {
    console.log(err, err.stack);
    res.status(500).send({ error: 'internal server error.', ...err });
  });
});

api.get('/owners', (req, res, next) => {
  const { ids } = req.query;
  if (!ids) return next();
  const idsArray = ids.split(",");
  getOwners(idsArray).then(owners => {
    res.send({ owners });
  }).catch(err => {
    res.status(500).send({ error: 'an error occured', err });
  });
});

module.exports = api;
