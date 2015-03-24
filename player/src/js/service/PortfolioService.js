var querystring = require('querystring');
var http = require('http');

function getHTMLFromMarkdown(filename, callback) {
  var post_data = querystring.stringify({
      'filename' : filename
  });

  var post_options = {
      host: 'localhost',
      port: '80',
      path: '/api/getMarkup',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.on('data', function (chunk) {
          callback({"markup": chunk});
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}

module.exports = {
  getHTMLFromMarkdown: getHTMLFromMarkdown
}