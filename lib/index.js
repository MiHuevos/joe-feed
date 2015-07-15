var express = require('express');
var app = require('./server-config')(express());
var debug = require('debug')('joe-feed');
const server = require('http').createServer(app);
const r = require('rethinkdb');

const renderClient = require('./render-client');
const createPost = require('./db/create-post');
const isUserOrInGroupPolicy = require('./policies/is-user-or-in-group');

app.use('/api', require('./api'));
app.get('/favicon.ico', (req, res) => res.send({}));
app.get('/:owner/:permalink?', renderClient);
app.get('/:owner/new', renderClient);

app.post('/:owner/new', isUserOrInGroupPolicy({ ownerInParams: true }));
app.post('/:owner/new', (req, res) => {
  const { markdown } = req.body;
  const { remoteUser } = req;
  const { owner } = req.params;

  createPost({ markdown, remoteUser, owner }).then(() => {
    res.redirect(`/${owner}`);
  }).catch(e => {
    debug('error occured.', e);
    debug(e.stack);
    res.status(500).send({ error: 'error occured.', status: 500 });
  });
});

r.connect({ host: 'localhost' }).then(conn => {
  r.conn = conn;
  conn.use('feed');
  server.listen(process.env.PORT || 1337, function() {
    const { address, port } = server.address();
    debug(`Listening on ${address}:${port}`);
  });
});
