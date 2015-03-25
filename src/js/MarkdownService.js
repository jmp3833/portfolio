'use strict'
var Showdown = require('showdown');
var fs = require('fs')

var converter = new Showdown.converter();

function convertMarkdownToHTML(filename, cb) {
  var fileLocation = './posts/' + filename + '.md';
  fs.readFile(fileLocation, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    cb(converter.makeHtml(data.toString()));
  });
}

module.exports = {
  convertMarkdownToHTML: convertMarkdownToHTML
}