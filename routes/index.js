var express = require('express');
var router = express.Router();
var MarkdownService = require('../src/js/MarkdownService');

router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/api/getPost', function(req, res) {
  var filename = req.body.filename;
  MarkdownService.getPost(filename, function(err, post, db) {
    if(err){throw err}
    db.close();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(post));
  });
});

router.post('/api/getNewest', function(req, res) {
  var amount = req.body.amount;
  MarkdownService.getNewestPosts(amount, function(err, newestPosts, db) {
    if(err){throw err}
    db.close();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newestPosts));
  });
});

router.post('/api/getAllPosts', function(req, res) {
  //Set a really high limit for all posts
  var allPosts = 10000;
  MarkdownService.getNewestPosts(allPosts, function(err, allPosts, db) {
    if(err){throw err}
    db.close();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allPosts));
  });
});

router.post('/api/getPostsAfterDate', function(req, res) {
  var date = req.body.date;
  MarkdownService.getPostsAfterDate(new Date(date), function(err, posts, db) {
    if(err){throw err}
    db.close();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(posts));
  });
});

router.post('/api/syncDB', function(req, res) {
  MarkdownService.syncDB();
  res.end("Done!");
});

module.exports = router;
