'use strict';
var React = require('react');
var Sidebar = require('./Sidebar.react');

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-4 sidebar">
          <Sidebar/>
        </div>
        <div className="col-sm-8 main-content-section">
          <div className="">Main Content Section</div>
        </div>
      </div>
    );
  }
});

module.exports = NotFound;