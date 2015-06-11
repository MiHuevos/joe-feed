var express = require('express');
var app = express();
var renderClient = require('./render-client');

app.use(renderClient);

app.listen(process.env.PORT || 1337);
