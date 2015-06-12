var express = require('express');
var app = express();
var renderClient = require('./render-client');

app.get('/:owner', renderClient);

app.listen(process.env.PORT || 1337);
