var express = require('express');
var router = express.Router();
var saleModel = require('../models/sales');
var userModel = require('../models/users');
var request = require('sync-request');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51KHnRjFcTa07fhQCsT77a7dMNM1tmeXihc8agkLpki93jx18R4BzhRP16vhZCdEQvGceLtreRQnLTbu7UqkWe4sH00KMMJTEfq');

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

// Show sale or product depends of the query elements
router.get('/show-sale', async function (req, res, next) {

   let brandName = req.query.brandName.replace('%20', ' ');
   let today = new Date;
   let sale = await saleModel.findOne({
      brandName: brandName,
      startingDate: {$lt: (today)},
      endingDate: {$gt: (today)},
   });

   if (!sale) {
      res.status(404).json({sale: 'brand not found'});
   } else {
      
      let products = sale.articles;

      if (req.query.productName != null && req.query.productName !== "undefined") {
         let productName = req.query.productName.replace('%20', ' ');
         let product

         for (let e of products) {
            console.log(e.name + '  --  ' + productName);
            if (e.name === productName)
               product = e;
         }
         if (!product) {
            res.status(404).json({sale: 'products not found'});
         } else {
            res.status(200).json({saleLabels: sale.brandLabels, saleImg: sale.brandImg, products: product});
         }
      } else {
         res.status(200).json({saleLabels: sale.brandLabels, saleImg: sale.brandImg, saleEnding: sale.endingDate, products: products});
      }
   }
});

// Gestion du module Stripe
router.post('/create-checkout-session', async (req, res) => {

   var basket = JSON.parse(req.body.basket)
   var deliveryPrice = req.body.delivery;

   // Gestion des images produit dans le module Stripe
   let imageProduit;
   var picture_1 = 'https://res.cloudinary.com/dknmaiec0/image/upload/v1645712618/thegreendoor/Produits/picture1_yrwb43.webp'
   var picture_2 = 'https://res.cloudinary.com/dknmaiec0/image/upload/v1645712618/thegreendoor/Produits/picture2_xisgmj.webp'
   var picture_3 = 'https://res.cloudinary.com/dknmaiec0/image/upload/v1645712618/thegreendoor/Produits/picture3_jszlct.webp'
   var picture_4 = 'https://res.cloudinary.com/dknmaiec0/image/upload/v1645712618/thegreendoor/Produits/picture4_wqtxdo.webp'

   var stripeItems = [];

   for (var i = 0; i < basket.length; i++) {

      if(basket[i].img == 'picture_1'){
         imageProduit = picture_1;
      } if (basket[i].img == 'picture_2'){
         imageProduit = picture_2;
      } if (basket[i].img == 'picture_3'){
         imageProduit = picture_3;
      } if (basket[i].img == 'picture_4'){
         imageProduit = picture_4;
      }

      stripeItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: basket[i].name,
            description : `Taille ${basket[i].size}`,
            images : [imageProduit]
          },
          unit_amount: basket[i].reducedPrice * 100,
        },
        quantity: basket[i].quantity,
      });
    }

      stripeItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
            images : ['https://res.cloudinary.com/dknmaiec0/image/upload/v1645712313/thegreendoor/icons/green_delivery_m3rffr.png']
          },
          unit_amount: deliveryPrice * 100,
        },
        quantity: 1,
      });


   let user = await userModel.findOne({token: req.body.token});

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['FR']},
      line_items: stripeItems,
      mode: 'payment',
      success_url: 'http://localhost:3001/order-validated',
      cancel_url: 'http://localhost:3000/order-canceled',
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
