var express = require('express');
var app = express();
var path = require('path');
const server = require('http').createServer(app);
const r = require('rethinkdb');
const sliceAt = require('utils/slice-at');
const arrToObj = require('utils/arr-to-obj');
const getOwners = require('./db/get-owners.js');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req, res, next) => {
  req.remoteUser = 'gal';
  next();
});

var renderClient = require('./render-client');

app.get('/:owner', renderClient);

app.get('/api/posts', (req, res, next) => {
  const owner = req.query.ownerId;
  if (!owner) return next();
  const ownerId = sliceAt(owner);
  const isGroup = ownerId === owner;
  r.table('posts').filter(post => (
    post('postedOn').eq(owner) &&
    (isGroup || post('author').eq(ownerId))
  )).run(r.conn).then(r => r.toArray()).then(arrToObj).then(posts => {
    res.send({
      posts
    });
  }).catch(err => {
    res.status(500).send({ error: 'an error occured', err });
  });
});

app.get('/api/owners', (req, res, next) => {
  const { ids } = req.query;
  if (!ids) return next();
  const idsArray = ids.split(",");
  getOwners(idsArray).then(owners => {
    res.send({ owners });
  }).catch(err => {
    res.status(500).send({ error: 'an error occured', err });
  });
});

r.connect({ host: 'localhost' }).then(conn => {
  r.conn = conn;
  conn.use('feed');
  server.listen(process.env.PORT || 1337, function() {
    const { address, port } = server.address();
    console.log(`Listening on ${address}:${port}`);
  });
});
