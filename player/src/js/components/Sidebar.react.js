'use strict';
/* @jsx React.DOM */
var React = require('react');
var Strings = require('../strings')

module.exports = React.createClass({
  render: function() {
    return (
      <div className="about-text">
        <img src="./public/images/profile.jpg" className="sidebar-profile"/>
        <h3>About</h3>
        <p>{Strings.about}</p>
        <p>{Strings.aboutFooter}</p>
        <hr className="sidebar-content-separator"></hr>
      </div>
    );
  },
});
