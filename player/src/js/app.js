'use strict';
/**
 * Bootstrap the application with React
 */

/* @jsx React.DOM */
var React = require('react');
var App = require('./components/App.react');
var PageNotFound = require('./components/404.react');

var Router = require('react-router');
var {Route, NotFoundRoute, DefaultRoute} = Router;

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <NotFoundRoute handler={PageNotFound}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(
    <Handler flux={flux}/>,
    document.getElementById('react')
  )
});
