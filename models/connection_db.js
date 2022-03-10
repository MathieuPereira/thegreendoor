var mongoose = require('mongoose')
require('dotenv').config();

var options = {
   connectTimeoutMS: 5000,
   useUnifiedTopology: true,
   useNewUrlParser: true,
}

var user = process.env.BDD_LOGIN
var password = process.env.BDD_PASSWORD
var db = process.env.BDD_NAMEDEPOT

mongoose.connect(`mongodb+srv://${user}:${password}@website.e1u76.mongodb.net/${db}?retryWrites=true&w=majority`,
   options,
   function(err) {
      if (err) {
         console.log(`error, failed to connect to the database because --> ${err}`);
      } else {
         console.info('*** Database Thegreendoor connection : Success ***');
      }
   }
);

module.exports = mongoose