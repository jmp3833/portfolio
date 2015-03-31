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
      var postCollection = {posts: JSON.parse(posts), tag: "Newest"};
      this.dispatch(constants.SIDEBAR_CONTENT_UPDATED, postCollection);
    }.bind(this));
  },

  getAllPosts: function() {
    PortfolioServiceClient.getAllPosts(function(posts){
      var postCollection = {posts: JSON.parse(posts), tag: "All"};
      this.dispatch(constants.SIDEBAR_CONTENT_UPDATED, postCollection);
    }.bind(this));
  },

   getPostsAfterDate: function(date) {
    PortfolioServiceClient.getPostsAfterDate(date, function(posts){
      var postCollection = {posts: JSON.parse(posts), tag: "2015"};
      this.dispatch(constants.SIDEBAR_CONTENT_UPDATED, postCollection);
    }.bind(this));
  }
};

module.exports = actions;