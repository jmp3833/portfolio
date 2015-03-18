'use strict';
var React = require('react');
var Sidebar = require('./Sidebar.react');

var NotFound = React.createClass({
  render: function() {
    return (
      <Sidebar/>
    );
  }
});

module.exports = NotFound;