var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var request = require('sync-request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
