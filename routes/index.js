var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var request = require('sync-request');

/*
 GET home page.
 Each if is used to add an property to the filter which will then search in the db
 */
router.get('/home', async function (req, res, next) {
   let filter = {};
   let today = new Date;
   today = today.toISOString();

   console.log(req.query.categories);

   if (req.query.categories != null && req.query.categories != 'undefined')
      filter.categories = req.query.categories;

   if (req.query.filter === 'to-be-started') {
      filter.startingDate = {$gt: (today)};
   } else {
      filter.startingDate = {$lt: (today)};
      filter.endingDate = {$gt: (today)};
   }

   let sales = await saleModel.find(filter);
   res.status(200).json({sales: sales});
});

router.get('/show-sale', async function (req, res, next) {
   let brandName = req.query.brandName.replace('%20', ' ');
   let today = new Date;
   let sale = await saleModel.findOne({
      brandName: brandName,
      startingDate: {$lt: (today)},
      endingDate: {$gt: (today)},
   }).populate();

   let products = sale.articles;
   if (!sale)
      res.status(404).json({sale: 'not found'});
   else
      res.status(200).json({sale: sale, products: products});
});

module.exports = router;
