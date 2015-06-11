require('babel/register')({
  stage: 0
});
var path = require('path');
require('app-module-path').addPath(path.resolve(__dirname, 'views/react/shared'));
require('./lib/index');
