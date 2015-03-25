'use strict'
var Showdown = require('showdown');
var fs = require('fs');
var path = require('path');
var DBInstance = require('./DBInstance');

var converter = new Showdown.converter();

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
* Go through all files in the posts directory and make sure
* all post content is in sync with the database.
*/
var syncDB = function() {
  DBInstance.connectToDB(function(err, db) {
    if(err){throw err}
    var collection = db.collection('posts');
    _walk('./posts', function(err, data) {
      if(err){throw err}
      var results = data.length;
      data.forEach(function(filePath) {
        _convertMarkdownToHTML(filePath, function(data){
          _getpostMetadata(filePath, function(metadata){
            var fileName = path.basename(filePath);
            collection.find({_id: fileName}).toArray(function(err,queryData) {
              var document = queryData[0];
              //If document doesnt exist in DB, insert it.
              if(!document) {
                collection.insert({
                  _id: fileName,
                  content: data,
                  date: metadata.date,
                  tags: metadata.tags
                });
              }
              //Update post content if it's stale.
              else if(data !== document.content){
                collection.update({_id: fileName},
                  {content: data,
                  date: metadata.date,
                  tags: metadata.tags}
                );
              }
              //All files have been updated. Lets get outta here!
              results--;
              if(results == 0){
                db.close();
              }
            });
          });
        });
      });
    });
  });
};

function _convertMarkdownToHTML(filename, cb) {
  fs.readFile(filename, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    cb(converter.makeHtml(data.toString()));
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
          _walk(file, function(err, res) {
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
  getNewestPosts: getNewestPosts,
  syncDB: syncDB
}