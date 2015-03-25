'use strict';
var Fluxxor = require('fluxxor');
var constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.pageContent = "";
    this.bindActions(
      constants.PAGE_MARKUP_FETCHED, this.onFetchMarkup,
      constants.SIDEBAR_CONTENT_UPDATED, this.onSidebarContentUpdate
    );
    this.sidebarContent = [];
  },

  onFetchMarkup: function(response) {
    this.pageContent = response.content;
    this.emit(constants.CHANGE_EVENT);
  },

  onSidebarContentUpdate: function(posts) {
    this.sidebarContent = posts;
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      pageContent: this.pageContent,
      sidebarContent: this.sidebarContent
    };
  }
});
