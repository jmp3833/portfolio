'use strict';
/* @jsx React.DOM */
var React = require('react');
var Strings = require('../strings')

module.exports = React.createClass({
  render: function() {
    return (
      <div className="about">
        <img src="./public/images/profile.jpg"/>
        <div className="about-text">
          <h3>About</h3>
          <p>{Strings.about}</p>
          <p>{Strings.aboutFooter}</p>
          <p>Check out my <a href="./public/docs/resume.pdf">Resume</a> or shoot me an email at <a>jmp3833@rit.edu</a></p><br></br>
          <div className="about-links">
            <a className="social" href="https://github.com/jmp3833"><i className="fa fa-github fa-2x"></i></a>
            <a className="social" href="https://www.linkedin.com/in/jmp3833"><i className="fa fa-linkedin fa-2x"></i></a>
            <a className="social" href="https://twitter.com/JPeterson__"><i className="fa fa-twitter fa-2x"></i></a>
            <hr className="sidebar-content-separator"></hr>
          </div>
        </div>
      </div>
    );
  },
});
