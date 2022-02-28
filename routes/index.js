var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var request = require('sync-request');

/*
GET home page.
 Each if is used to add an property to the filter which will then search in the db
*/
router.get('/home-page', async function (req, res, next) {
   let filter = {};
   let today = new Date;
   today = today.toISOString();

   if (req.query.categories != null) {
      filter.categories = req.query.categories;
   }

   if (req.query.filter === 'already-started') {
      filter.startingDate = {$lt: (today)};
      filter.endingDate = {$gt: (today)};
   }

   if (req.query.filter === 'to-be-started') {
      filter.startingDate = {$gt: (today)};
   }

   let sales = await saleModel.find(filter);
   res.status(200).json({response: true, sales: sales});
});

module.exports = router;
