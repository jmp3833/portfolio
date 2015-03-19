'use strict';
var React = require('react');
var Sidebar = require('./Sidebar.react');

var NotFound = React.createClass({
  render: function() {
    return (
      <section className="index-section">
        <div className="col-sm-3">
          <Sidebar/>
        </div>
        <div className="col-sm-9 content-separator">
          Main content area
        </div>
      </section>
    );
  }
});

module.exports = NotFound;