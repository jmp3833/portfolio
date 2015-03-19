'use strict';
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
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
                <li id="about"><a href="#/about">About</a></li>
                <li id="contact"><a href="#/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <hr className="navbar-underline"></hr>
        </nav>
      </section>
    );
  }
});