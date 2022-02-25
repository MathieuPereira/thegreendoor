var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var articleModel = require('../models/sales');

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index', {title: 'Express'});
});

router.post('/create-sale', async function (req, res, next) {
   // Variables request
   let brandName = req.body.brandName;
   let brandFastDesc = req.body.brandFastDesc;
   let brandDesc = req.body.brandDesc;
   let maxDiscount = req.body.maxDiscount;
   let startingDate = req.body.startingDate;
   let endingDate = req.body.endingDate;
   let categories = req.body.categories;
   let brandLabels = req.body.brandName;
   console.log(brandName);

   if (!brandName || brandName == null ||brandName == 'undefined' || brandName == undefined) {
      res.json({result: false, comment: 'Missing infos'});
   }

   // Date
   startingDate = startingDate.split('/');
   endingDate = endingDate.split('/');
   startingDate = new Date(startingDate[2], startingDate[1], startingDate[0]);
   endingDate = new Date(endingDate[2], endingDate[1], endingDate[0]);

   // Categories & Labels
   categories = categories.split(',');
   brandLabels = brandLabels.split(',');

   let saveSales = new saleModel({
      brandName: brandName,
      brandFastDesc: brandFastDesc,
      brandDesc: brandDesc,
      maxDiscount: maxDiscount,
      startingDate: startingDate,
      endingDate: endingDate,
      categories: categories,
      brandLabels: brandLabels,
   });

   let savedSales = await saveSales.save();

   if (savedSales._id)
      res.json({result: true, comment: 'Article has been saved in DB'});
   else
      res.json({result: false, comment: 'There was an error during the transfer please repeat'});
});

router.post('/add-articles', async function (req, res, next) {
   let sale = await saleModel.findById(req.body.id);

   if (!sale)
      res.json({result: false, comment: 'Sale not found'});

   sale.articles.push({
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