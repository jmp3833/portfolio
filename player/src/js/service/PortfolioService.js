var querystring = require('querystring');
var http = require('http');

function getHTMLFromMarkdown(filename, callback) {
  var params = querystring.stringify({
    filename: filename
  });
  _POST(params, '/api/getPost', callback);
}

function getTopPosts(callback) {
  var params = querystring.stringify({
    amount: 10
  });
  _POST(params, '/api/getNewest', callback);
}

function getAllPosts(callback) {
  var params = querystring.stringify({});
  _POST(params, '/api/getAllPosts', callback);
}

function getPostsAfterDate(date, callback) {
  var params = querystring.stringify({
    date: date
  });
  _POST(params, '/api/getPostsAfterDate', callback);
}

function _POST(postData, path, callback) {
  var post_options = {
      host: '127.0.0.1',
      port: '80',
      path: path,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.on('data', function (chunk) {
          callback(chunk);
      });
  });

  // post the data
  post_req.write(postData);
  post_req.end();
}

module.exports = {
  getHTMLFromMarkdown: getHTMLFromMarkdown,
  getTopPosts: getTopPosts,
  getAllPosts: getAllPosts,
  getPostsAfterDate: getPostsAfterDate
}