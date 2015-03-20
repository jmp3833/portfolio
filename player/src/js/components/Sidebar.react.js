'use strict';
/* @jsx React.DOM */
var React = require('react');
var Strings = require('../strings')

module.exports = React.createClass({
  render: function() {
    return (
      <div className="sidebar-container">
        <img src="./public/images/profile.jpg" className="sidebar-profile"/>
        <h3>About</h3>
        {Strings.about}
      </div>
    );
  },
});