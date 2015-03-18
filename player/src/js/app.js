'use strict';
/**
 * Bootstrap the application with React
 */

/* @jsx React.DOM */
var React = require('react');
var App = require('./components/App.react');
var PageNotFound = require('./components/404.react');
var Index = require('./components/Index.react')

var Router = require('react-router');
var {Route, NotFoundRoute, DefaultRoute} = Router;

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <NotFoundRoute handler={PageNotFound}/>
  </Route>
);

var NavBar = (
    <section>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Justin Peterson</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="active" id="home" data-toggle="active" data-target="#home"><a href="#">Home</a></li>
              <li className="active" id="about" data-toggle="active" data-target="#about"><a href="#about">About</a></li>
              <li className="active" id="contact" data-toggle="active" data-target="#contact"><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
);

Router.run(routes, function(Handler) {
  React.render(
    <div>    
      {NavBar}
      <div className="spacer"></div>
      <hr className="navbar-underline"></hr>
      <Handler/>
    </div>,
    document.getElementById('react')
  )
});
