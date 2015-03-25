var express = require('express');
var router = express.Router();
var MarkdownService = require('../src/js/MarkdownService');

router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/api/getPost', function(req, res) {
  var filename = req.body.filename;
  MarkdownService.getPost(filename, function(err, post) {
    if(err){throw err}
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(post));
  });
});

router.post('/api/getNewest', function(req, res) {
  var amount = req.body.amount;
  MarkdownService.getNewestPosts(10, function(newestPosts) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newestPosts));
  });
});

router.post('/api/syncDB', function(req, res) {
  MarkdownService.syncDB();
  res.end("Done!");
});

module.exports = router;
