var express = require('express');
var app = express();
var path = require('path');
const server = require('http').createServer(app);
const r = require('rethinkdb');
const arrToObj = require('utils/arr-to-obj');
const getOwners = require('./db/get-owners.js');
const getPosts = require('./db/get-posts.js');
const fs = require('fs');
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/dist/fonts', express.static(path.resolve(__dirname, '../node_modules/material-design-iconfont/fonts')));
app.use((req, res, next) => {
  req.remoteUser = 'gal';
  req.adGroups = [
    "magma",
    "hagvarim.gcd"
  ];
  req.userTitle = 'ראש צוות מאגמה - גל שלזינגר';
  next();
});
app.use((req, res, next) => {
  req.webpackStats = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../webpack.stats.json')));
  next();
});

var renderClient = require('./render-client');

app.get('/api/posts', (req, res, next) => {
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

app.get('/favicon.ico', (req, res) => res.send({}));
app.get('/*', renderClient);

r.connect({ host: 'localhost' }).then(conn => {
  r.conn = conn;
  conn.use('feed');
  server.listen(process.env.PORT || 1337, function() {
    const { address, port } = server.address();
    console.log(`Listening on ${address}:${port}`);
  });
});
