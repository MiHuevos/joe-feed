var path = require('path');
require('babel/register')({ stage: 0 });
require('app-module-path').addPath(path.resolve(__dirname, '../views/react/shared'));
