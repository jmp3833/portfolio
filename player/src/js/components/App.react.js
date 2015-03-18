'use strict';
/* @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var {RouteHandler} = Router;

var App = React.createClass({
  render: function() {
    return (
      <div id='mainContainer'>
        <RouteHandler/>
      </div>
    );
  },
});
module.exports = App;
