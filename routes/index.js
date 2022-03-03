var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var request = require('sync-request');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

/*
GET home page.
 Each if is used to add an property to the filter which will then search in the db
*/
router.get('/home', async function (req, res, next) {
   let filter = {};
   let today = new Date;
   today = today.toISOString();

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

   if (!sale) {
      res.status(404).json({sale: 'brand not found'});
   } else {
      let products = sale.articles;
      /*
      if (req.query.product != null && req.query.product != "undefined") {
         let product
         for (let e of products) {
            console.log(e.name + '  --  ' + req.query.product);
            if (e.name == req.query.product)
               product = e;
         }
         if (product != undefined || product != null) {
            res.status(404).json({sale: 'products not found'});
         } else {
            res.status(200).json({saleLabels: sale.brandLabels, saleImg: sale.brandImg, products: product});
         }
      }*/
      res.status(200).json({saleLabels: sale.brandLabels, saleImg: sale.brandImg, saleEnding: sale.endingDate, products: products});
      // res.status(200).json({saleLabels: sale.brandLabels, saleImg: sale.brandImg, saleEnding: sale.endingDate, products: products});
   }
});

// Gestion du module Stripe
router.post('/create-checkout-session', async (req, res) => {

   var stripeItems = [];
   var fraisPort = 0;
   var totalCmd = 0;

   stripeItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Article',
        },
        unit_amount: 100 * 100,
      },
      quantity: 1,
    });

   if (fraisPort > 0) {
      stripeItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
          },
          unit_amount: fraisPort * 100,
        },
        quantity: 1,
      });
    }

   const session = await stripe.checkout.sessions.create({
      customer_email: 'customer@example.com',
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['FR']},
      line_items: stripeItems,
      mode: 'payment',
      success_url: 'https://localhost:3000/success',
      cancel_url: 'https://localhost:3000/cancel',
    });

    res.redirect(303, session.url);
  });

  router.get('/success', function (req, res, next) {
   res.json('confirm');
 })

 router.get('/cancel', function (req, res, next) {
   res.json('cancel');
 })

module.exports = router;
