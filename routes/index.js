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

module.exports = router;
