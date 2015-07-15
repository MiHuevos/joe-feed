// Kickstarting the app in the client side...
// Here we will call the main `React.render`

const React = require('react');
const routes = require('./routes');
const Flux = require('flux');
const { Router } = require('react-router');
const BrowserHistory = require('react-router/lib/BrowserHistory');
const history = new BrowserHistory();
const flux = window.flux = new Flux();

import Provider from 'flux/provider';
require('moment').locale('he');

flux.start();
React.render(
  <Provider cosm={ flux }>
    <Router
      children={ routes({ flux, shouldListen: true }) }
      history={ history }
    />
  </Provider>, document.getElementById("main")
);
