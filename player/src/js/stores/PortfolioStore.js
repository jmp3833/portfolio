'use strict';
var Fluxxor = require('fluxxor');
var constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.pageContent = "";
    this.bindActions(
      constants.PAGE_MARKUP_FETCHED, this.onFetchMarkup
    );
  },

  onFetchMarkup: function(response) {
    this.pageContent = response.content;
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      pageContent: this.pageContent
    };
  }
});
