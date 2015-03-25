var express = require('express');
var router = express.Router();
var MarkdownService = require('../src/js/MarkdownService');

router.get('/', function(req, res, next) {
  res.render('index.html');
});

//Backend data service routes
router.post('/api/getMarkup', function(req, res) {
  var filename = req.body.filename;
  MarkdownService.convertMarkdownToHTML(filename, function(responseHTML) {
    res.setHeader('Content-Type', 'text/html');
    res.end(responseHTML);
  });
});

router.post('/api/getNewest', function(req, res) {
  var amount = req.body.amount;
  MarkdownService.getNewestPosts(10, function(newestPosts) {
    res.setHeader('Content-Type', 'application/json');
    res.end(newestPosts.toString());
  });
});

module.exports = router;
