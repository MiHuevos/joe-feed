"use strict";

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';

var webpackConf = {
  devtool: 'eval',
  cache: true,
  entry: './views/react/app.js',
  output: {
    path: './public/dist',
    filename: '[hash].js',
    chunkFilename: "bundle.[chunkhash].js",
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      { test: /(views[\/\\]react.*|node_modules\/react-fa)\.js$/, loader: 'babel-loader?cacheDirectory=true&stage=0' },
      { test: /\.(png|jpg)$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/,
        loader: 'url-loader?limit=8192'
      },
      { test: /\.(eot)$/, loader: 'url' },
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      './views/react/shared'
    ],
    extensions: ["", ".js"]
  },
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "webpack.stats.json"),
          JSON.stringify(stats.toJson()));
      });
    },
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.DefinePlugin({
      'process.env.IS_WEBPACK': 'true'
    }),
    new ExtractTextPlugin('bundle.css'),
  ]
};

if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production') {
  webpackConf.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      sourceMap: false
    })
  );
}

module.exports = webpackConf;
