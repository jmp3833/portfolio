var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var connectToDB = function(callback) {
  /*
  * Connect and pass database instance if available.
  */
  var url = 'mongodb://localhost:27017/portfolio';
  MongoClient.connect(url, function(err, db) {
    callback(err, db);
  });
};

module.exports = {
  connectToDB: connectToDB
};