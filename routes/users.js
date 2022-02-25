var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function (req, res, next) {
   res.send('respond with a resource');
});

router.post('/sign-up', async function (req, res) {
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let email = req.body.email;
   let password = req.body.password;

   if (firstName && firstName !== " " && firstName !== "undefined") {
      if (lastName && lastName !== " " && lastName !== "undefined") {
         if (email && email !== " " && email !== "undefined") {
            if (password && password !== " " && password !== "undefined") {
               let checkEmailUser = await userModel.findOne({email: req.body.email});
               if (!checkEmailUser) {
                  const hash = bcrypt.hashSync(req.body.password, 10);
                  let newUser = new userModel({
                     token: uid2(32),
                     firstName: req.body.firstName,
                     lastName: req.body.lastName,
                     email: req.body.email,
                     password: hash,
                  });
                  let userSaved = await newUser.save();

                  if (userSaved._id) {
                     res.json({result: true, user: userSaved});
                  } else {
                     res.json({result: false, comment: "Une erreur s'est produite dans la base de données"});
                  }
               } else {
                  res.json({result: false, comment: "Cet email à déjà été enregistré"});
               }
            } else {
               res.json({result: false, comment: "Le password rentré n'est pas valide"});
            }
         } else {
            res.json({result: false, comment: "L'email rentré n'est pas valide"});
         }
      } else {
         res.json({result: false, comment: "Le nom rentré n'est pas valide"});
      }
   } else {
      res.json({result: false, comment: "Le prénom rentré n'est pas valide"});
   }
});

router.post('/sign-in', async function (req, res, next) {
   let email = req.body.email;
   let password = req.body.password;

   if (email && email !== " " && email !== "undefined") {
      if (password && password !== " " && password !== "undefined") {
         let searchedUser = await userModel.findOne({email: email});

         if (bcrypt.compareSync(password, searchedUser.password)) {
            res.json({result: true, user: searchedUser});
         } else {
            res.json({ result: false, comment: "L'email ou le mot de passe est faux" });
         }
      } else {
         res.json({result: false, comment: "Le password rentré n'est pas valide"});
      }
   } else {
      res.json({result: false, comment: "L'email rentré n'est pas valide"});
   }
});

router.post('/add-adress', async function (req, res, next) {
   let user = await userModel.findOne({token: req.body.token});

   if (!user)
      res.json({result: false, comment: 'User not found'})

   user.adresses.push()

});

module.exports = router;
