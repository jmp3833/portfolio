'use strict';
var constants = require('../constants');
var PortfolioServiceClient = require('../service/PortfolioService');

var actions = {
  setPageMarkup: function(filename) {
    PortfolioServiceClient.getHTMLFromMarkdown(filename, function(payloadData) {
      this.dispatch(constants.PAGE_MARKUP_FETCHED, JSON.parse(payloadData));
    }.bind(this));
  },

  getNewestPosts: function() {
    PortfolioServiceClient.getTopPosts(function(posts){
      this.dispatch(constants.SIDEBAR_CONTENT_UPDATED, JSON.parse(posts));
    }.bind(this));
  }
};

module.exports = actions;
