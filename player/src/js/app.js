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
              <li id="home"><a href="#">Home</a></li>
              <li id="programming"><a href="#/blog/programming">Programming</a></li>
              <li id="adventures"><a href="#/blog/adventures">Adventures</a></li>
            </ul>
          </div>
        </div>
        <hr className="navbar-underline"></hr>
      </nav>
    </section>
);

Router.run(routes, function(Handler) {
  React.render(
    <div>    
      {NavBar}
      <div className="spacer"></div>
      <Handler/>
      <div id="footer">
        <hr className="navbar-underline"></hr>
        <p className='footer-copyright-text'>&copy; Justin Peterson, 2015.</p>
      </div>
    </div>,
    document.getElementById('react')
  )
});
