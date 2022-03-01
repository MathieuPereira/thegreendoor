var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var request = require('sync-request');

/*
GET home page.
 Each if is used to add an property to the filter which will then search in the db
*/
router.get('/', async function (req, res, next) {
   let filter = {};
   let today = new Date;
   today = today.toISOString();

   if (req.query.categories != null)
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
   let today = new Date;
   let sale = await saleModel.findOne({
      brandName: req.query.brandName,
      startingDate: {$lt: (today)},
      endingDate: {$gt: (today)}
   }).populate();
   console.log(`**** ${sale} ****`);

   if (!sale)
      res.status(404).json({sale: 'not found'})
   else
      res.status(200).json({sale: sale});
});


module.exports = router;
