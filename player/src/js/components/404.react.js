'use strict';
var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
        <div>404 Page<br/>{"Looks like this page isn't done yet!"}</div>
    );
  }
});

module.exports = NotFound;