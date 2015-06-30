// Kickstarting the app in the client side...
// Here we will call the main `React.render`

const React = require('react');
const routes = require('./routes');
const Flux = require('flux');
const { Router } = require('react-router');
const BrowserHistory = require('react-router/lib/BrowserHistory');
const history = new BrowserHistory();
const flux = new Flux();
const Im = require('immutable');
var lastFlux = Im.Map();
require('moment').locale('he');

flux.listen(() => {
  const newFlux = Im.fromJS(flux.toJSON());
  if (Im.is(newFlux, lastFlux)) return;
  if (lastFlux) console.log('rerender..');
  lastFlux = newFlux;
  React.render(
    <Router
      children={ routes({ flux, shouldListen: true }) }
      history={ history }
    />, document.getElementById("main")
  );
});

flux.start();
flux.replace(window.initialState);
