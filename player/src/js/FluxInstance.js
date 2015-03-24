'use strict';

var Fluxxor = require('fluxxor');
var PortfolioStore = require('./stores/PortfolioStore'); 
var portfolioActions = require('./actions/PortfolioActionCreators');

//Initalize all stores
var stores = {
  PortfolioStore : new PortfolioStore()

};

var actions = portfolioActions;
var flux = new Fluxxor.Flux(stores,actions);

flux.on("dispatch", function(type, payload) {
  console.log("[Dispatch]", type, payload);
});

module.exports = flux;
