var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var articleModel = require('../models/sales');

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index', {title: 'Express'});
});

router.post('/create-sale', async function (req, res, next) {

   // Date
   let startingDate = req.body.startingDate.split('/');
   let endingDate = req.body.endingDate.split('/');
   startingDate = new Date(startingDate[2], startingDate[1], startingDate[0]);
   endingDate = new Date(endingDate[2], endingDate[1], endingDate[0]);

   // Categories & Labels
   let categories = req.body.categories.split(',');
   let brandLabels = req.body.brandLabels.split(',');

   let saveSales = new saleModel({
      brandName: req.body.brandName,
      brandFastDesc: req.body.brandFastDesc,
      brandDesc: req.body.brandDesc,
      maxDiscount: req.body.maxDiscount,
      startingDate: startingDate,
      endingDate: endingDate,
      categories: categories,
      brandLabels: brandLabels,
   });

   let savedSales = await saveSales.save();

   if (savedSales._id)
      res.json({result: true, comment: 'Article has been saved in DB', sales: savedSales});
   else
      res.json({result: false, comment: 'There was an error during the transfer please repeat'});
});

router.post('/add-articles', async function (req, res, next) {
   let sale = await saleModel.findOne({_id: req.body.id});
   console.log(sale);

   if (!sale)
      res.json({result: false, comment: 'Sale not found'});

   sale.articles.push ({
      name: req.body.name,
      img: req.body.img,
      normalPrice: req.body.normalPrice,
      reducedPrice: req.body.reducedPrice,
      fastDesc: req.body.fastDesc,
      detailedDesc: req.body.detailed,
   });

   let savedSales = await sale.save();

   if (savedSales._id)
      res.json({result: true, comment: 'Article has been saved in DB', sales: savedSales});
   else
      res.json({result: false, comment: 'There was an error during the transfer please repeat'});
});

module.exports = router;