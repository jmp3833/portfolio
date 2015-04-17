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
    this.postTitle = "";
    this.postSubtitle = null; //Subtitle won;t always be there.
    this.activeTag = "";
  },

  onFetchMarkup: function(response) {
    this.pageContent = response.content;
    this.postTitle = response.title;
    this.postSubtitle = response.subtitle;
    this.emit(constants.CHANGE_EVENT);
  },

  onSidebarContentUpdate: function(postCollection) {
    this.sidebarContent = postCollection.posts;
    this.activeTag = postCollection.tag;
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      pageContent: this.pageContent,
      sidebarContent: this.sidebarContent,
      activeTag: this.activeTag,
      postTitle: this.postTitle,
      postSubtitle: this.postSubtitle
    };
  }
});
