'use strict'
var showdown = require('showdown');
var fs = require('fs')

var converter = new Showdown.converter();

function convertMarkdownToHTML(filename, cb) {
  fs.readFile(filename, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    cb(converter.makeHtml(data.toString()));
  });
}

module.exports = {
  convertMarkdownToHTML: convertMarkdownToHTML
}