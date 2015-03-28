'use strict';
/**
 * Bootstrap the application with React
 */

/* @jsx React.DOM */
var React = require('react');
var App = require('./components/App.react');
var PageNotFound = require('./components/404.react');
var Post = require('./components/Index.react');
var Sidebar = require('./components/Sidebar.react');

var flux = require('./FluxInstance');

var Router = require('react-router');
var {Route, NotFoundRoute, DefaultRoute} = Router;

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Post}/>
    <Route name="post" path="/blog/post/:postId" handler={Post} />
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
              <li id="programming"><a href="#/blog/tags/programming">Programming</a></li>
              <li id="adventures"><a href="#/blog/tags/adventures">Adventures</a></li>
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
      <div className="row">
        <div className="col-sm-4 sidebar">
          <Sidebar flux={flux}/>
        </div>
        <div className="col-sm-8 main-content-section">
          <Handler flux={flux}/>
        </div>
      </div>
      <div id="footer">
        <hr className="navbar-underline"></hr>
        <p className='footer-copyright-text'>&copy; Justin Peterson, 2015.</p>
      </div>
    </div>,
    document.getElementById('react')
  )
});
