const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  req.webpackStats = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../webpack.stats.json')));
  next();
};
