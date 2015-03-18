'use strict';
var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
        <div>404 Page<br/>Something went wrong.</div>
    );
  }
});

module.exports = NotFound;