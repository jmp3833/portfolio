'use strict';
var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NotFound = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PortfolioStore")],

  render: function() {
    return (
      <section>
        <h2 className="post-title">
          The Post Title
        </h2>
        <h3 className="post-subtitle">
          ...The Post Subtitle
        </h3>
        <hr></hr>
        <span dangerouslySetInnerHTML={{__html: this.state.pageContent}} />
      </section>
    );
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("PortfolioStore").getState();
  },

  componentWillMount: function() {
    this.getFlux().actions.setPageMarkup('Index');
  }
});

module.exports = NotFound;