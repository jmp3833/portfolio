'use strict'
var Showdown = require('showdown');
var fs = require('fs');
var path = require('path');

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

/*
* Get the [amount] most recent blog posts.
*/
function getNewestPosts(amount, callback) {
  //TODO: Tie in DB and make call
  _walk('./posts', function(err, data) {
    if(err) {throw(err);} 
    callback(data);
  });
}

/*
* recursively walk directory and return an array of files in all subdirs.
*/
var _walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

/*
 * Get post metadata (date, tags) from post file header.  
*/
var _getpostMetadata= function(filename, callback) {
  var fileStream = fs.createReadStream(filename);
  fileStream
  .on('data', function (chunk) {
    var postDate = chunk.toString().split('\n')[0].slice(4,-3);
    var postTags = chunk.toString().split('\n')[1].slice(4,-3);
    var postTagsArray = postTags.split(', ');
    fileStream.destroy();
    callback({
      date: postDate,
      tags: postTagsArray
    });
  })
  .on('error', function (err) {
    console.log(err);
  });
};

module.exports = {
  convertMarkdownToHTML: convertMarkdownToHTML,
  getNewestPosts: getNewestPosts
}