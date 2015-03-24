'use strict'
var pagedown = require("pagedown");
var fs = require('fs')

var converter = new pagedown.Converter();

function convertMarkdownToHTML(filename, cb) {
  fs.readFile(filename, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    cb(converter.makeHtml(data));
  });
}

module.exports = {
  convertMarkdownToHTML: convertMarkdownToHTML
}