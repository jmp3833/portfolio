'use strict';
/* @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var {RouteHandler} = Router;

var App = React.createClass({
  mixins: [FluxMixin],
  render: function() {
    return (
      <div id='mainContainer'>
        <RouteHandler/>
      </div>
    );
  },
});
module.exports = App;
