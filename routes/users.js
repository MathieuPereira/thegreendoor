var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
const bcrypt = require("bcrypt");

var userModel = require('../models/users');
var saleModel = require('../models/sales');

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
                regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\/]).{8,}$/
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
                    if (password.length <= 8) {
                        res.status(449).json({comment: "Le mot de passe doit faire au moins 8 caractères"});
                    } else if (!/[!@#$%^&*()\/]/.test(password)){
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère spécial"});
                    } else if (!/[a-z]/.test(password)){
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère en minuscule"});
                    } else if (!/[A-Z]/.test(password)){
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère en majuscule"});
                    } else if (!/\d/.test(password)){
                        res.status(449).json({comment: "Le mot de passe doit contenir au moins un caractère numérique"});
                    }
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

router.post('/add-adress', async function (req, res, next) {
    let user = await userModel.findOne({token: req.body.token});

    if (!user)
        res.status(404).json({comment: 'User not found'});

    user.addresses.push({
        country: req.body.country,
        city: req.body.city,
        zipCode: req.body.zipCode,
        address: req.body.address,
    });

    let savedUser = await user.save();

    if (savedUser._id)
        res.status(200).json({user: user});
    else
        res.status(409).json({comment: 'There was an error during the transfer please repeat'});
});

/*
NOT FINISHED YET
 */
router.post('/add-order', async function (req, res, next) {
    let user = await userModel.findOne({token: req.body.token});

    if (!user)
        res.status(404).json({comment: 'User not found'});

    let articles = [];
    let orders
    for (let e of JSON.parse(req.body.articles)) {
        let brand = await saleModel.findOne({brandName: e.brand})
        for (let i of brand.articles) {
            if (i.name === e.name) {
                articles.push({price: e.reducedPrice, quantity: e.quantity, size: e.size, product:  i._id});
            }
        }
    }

    user.orders.push({
        price: req.body.price,
        deliveryService: req.body.deliveryService,
        articles: articles,
    });

    let savedUser = await user.save();

    if (savedUser._id)
        res.status(200).json({user: user});
    else
        res.status(409).json({comment: 'There was an error during the transfer please repeat'});
});

module.exports = router;
