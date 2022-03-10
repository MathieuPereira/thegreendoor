var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
const bcrypt = require("bcrypt");

var userModel = require('../models/users');
var saleModel = require('../models/sales');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51KHnRjFcTa07fhQCsT77a7dMNM1tmeXihc8agkLpki93jx18R4BzhRP16vhZCdEQvGceLtreRQnLTbu7UqkWe4sH00KMMJTEfq');

router.post('/sign-up', async function (req, res) {
    let firstName = req.body.firstName.toLowerCase();
    let lastName = req.body.lastName.toLowerCase();
    let email = req.body.email;
    let password = req.body.password;
    let regexPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!/0-9]\s/.test(firstName) && firstName !== "undefined") {
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        if (!/0-9]\s/.test(lastName) && lastName !== "undefined") {
            lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
            if (regexPattern.test(email)) {
                regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\/]).{8,}$/;
                if (regexPattern.test(password)) {
                    let checkEmailUser = await userModel.findOne({email: req.body.email});
                    if (!checkEmailUser) {
                        const hash = bcrypt.hashSync(req.body.password, 10);
                        let newUser = new userModel({
                            token: uid2(32),
                            firstName: firstName,
                            lastName: lastName,
                            email: req.body.email,
                            password: hash,
                        });
                        let userSaved = await newUser.save();

                        if (userSaved._id) {
                            res.status(200).json({token: userSaved.token});
                        } else {
                            res.status(409).json({comment: "Une erreur s'est produite dans la base de données"});
                        }
                    } else {
                        res.status(409).json({comment: "Cet email à déjà été enregistré"});
                    }
                } else {
                    if (password.length <= 8)
                        res.status(449).json({comment: "Le mot de passe doit faire au moins 8 caractères"});
                    else if (!/[!@#$%^&*()\/]/.test(password))
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère spécial"});
                    else if (!/[a-z]/.test(password))
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère en minuscule"});
                    else if (!/[A-Z]/.test(password))
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère en majuscule"});
                    else if (!/\d/.test(password))
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère numérique"});
                }
            } else {
                res.status(449).json({comment: "L'email rentré n'est pas valide"});
            }
        } else {
            res.status(449).json({comment: "Le nom rentré n'est pas valide"});
        }
    } else {
        res.status(449).json({comment: "Le prénom rentré n'est pas valide"});
    }
});

router.post('/sign-in', async function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (email && email !== " " && email !== "undefined") {
        if (password && password !== " " && password !== "undefined") {
            let searchedUser = await userModel.findOne({email: email});

            if (bcrypt.compareSync(password, searchedUser.password)) {
                res.status(200).json({token: searchedUser.token});
            } else {
                res.status(409).json({comment: "L'email ou le mot de passe est faux"});
            }
        } else {
            res.status(449).json({comment: "Le password rentré n'est pas valide"});
        }
    } else {
        res.status(449).json({comment: "L'email rentré n'est pas valide"});
    }
});

router.post('/add-address', async function (req, res, next) {
    let user = await userModel.findOne({token: req.body.token});

    const session = await stripe.checkout.sessions.retrieve(req.body.stripeSession);

    if (!user)
        res.status(404).json({comment: 'User not found'});
    let addressAlreadyExists = user.addresses.filter((e) => e.address == session.shipping.address.line1)
    if (addressAlreadyExists.length < 1) {
        user.addresses.push({
            country: 'France',
            city: session.shipping.address.city,
            zipCode: session.shipping.address.postal_code,
            address: session.shipping.address.line1,
        });
    }

    let savedUser = await user.save();

    if (savedUser._id)
        res.status(200).json({comment: 'Adress saved in db'});
    else
        res.status(409).json({comment: 'There was an error during the transfer please repeat'});
});

router.post('/add-order', async function (req, res, next) {
    let user = await userModel.findOne({token: req.body.token});
    let deliveryService = parseInt(req.body.deliveryService);

    if (!user)
        res.status(404).json({comment: 'User not found'});

    let articles = [];
    let price = 0;
    for (let e of JSON.parse(req.body.articles)) {
        let brand = await saleModel.findOne({brandName: e.brand});
        for (let i of brand.articles) {
            if (i.name === e.name) {
                articles.push({
                    name : e.name,
                    img : e.img,
                    normalPrice : e.normalPrice,
                    reducedPrice : e.reducedPrice,
                    quantity: e.quantity,
                    size: e.size,
                    product: i
                });
                price += i.reducedPrice * e.quantity;
            }
        }
    }

    let deliveryPrice = deliveryService == 1 ? 3.9 : 5.4;
    deliveryService = deliveryService == 1 ? 'Standard' : 'Repack';

    let newOrder = {
        price: req.body.price,
        deliveryPrice: deliveryPrice,
        deliveryService: deliveryService,
        articles: articles,
    };

    user.orders.push(newOrder);

    let savedUser = await user.save();

    if (savedUser._id)
        res.status(200).json({comment: 'Order saved in db'});
    else
        res.status(409).json({comment: 'There was an error during the transfer please repeat'});
});

router.post('/last-order', async function (req, res, next) {
    let user = await userModel.findOne({token: req.body.token}).populate('orders.articles');
    let userOrder = user.orders[user.orders.length - 1];

    if (userOrder)
        res.status(200).json({order: userOrder});
    else
        res.status(409).json({comment: 'No order found'});
});

router.post('/past-orders', async function (req, res, next) {
    
    let user = await userModel.findOne({token: req.body.token});

    res.json(user.orders);
});

module.exports = router;
