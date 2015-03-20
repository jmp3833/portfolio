'use strict';
var React = require('react');
var Sidebar = require('./Sidebar.react');

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-fixed-300">
          <Sidebar/>
        </div>
        <div className="col-md-12 col-offset-300 hidden-xs">
          <div className="row content-separator">
            Standard grid system content here
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NotFound;