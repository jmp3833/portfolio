'use strict';
var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NotFound = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PortfolioStore")],

  render: function() {
    return (
      <span dangerouslySetInnerHTML={{__html: this.state.pageContent}} />
    );
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    console.log(flux.store("PortfolioStore").getState());
    return flux.store("PortfolioStore").getState();
  },

  componentWillMount: function() {
    this.getFlux().actions.setPageMarkup('README.md');
  }
});

module.exports = NotFound;