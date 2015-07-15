const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const webpackStats = require('./middlewares/webpack-stats');
const moment = require('moment');
const callMiddlewares = require('./middlewares/plugins');

module.exports = (app) => {
  moment.locale('he');
  app.set('views', path.resolve(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ extended: true }));
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use('/dist/fonts', express.static(path.resolve(__dirname, '../node_modules/material-design-iconfont/fonts')));
  callMiddlewares(app);
  app.use(webpackStats);
  return app;
};
