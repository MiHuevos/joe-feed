const { Route } = require('react-router');
const React = require('react');
const RootComponent = require('./root-component');
const Owner = require('./screens/App/screens/Owner');

module.exports = (
  <Route name='root' path='/' handler={ RootComponent }>
    <Route name='owner' path='/:owner' handler={ Owner } />
  </Route>
);
