// Kickstarting the app in the client side...
// Here we will call the main `React.render`

const React = require('react');
const routes = require('./routes');
const Flux = require('flux');
const { Router } = require('react-router');
const BrowserHistory = require('react-router/lib/BrowserHistory');
const flux = new Flux();
const browserHistory = new BrowserHistory();

flux.listen(() => {
  React.render(
    <Router
      children={ routes({ flux, shouldListen: true }) }
      history={ browserHistory }
    />, document.getElementById("main")
  );
});

flux.start();
flux.replace(window.initialState);
