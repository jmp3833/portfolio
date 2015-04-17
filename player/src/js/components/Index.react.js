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
          {this.state.postTitle}
        </h2>
        {this.state.postSubtitle !== ''? (
          <h3 className="post-subtitle">
            {this.state.postSubtitle}
          </h3>
        ) : undefined}
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