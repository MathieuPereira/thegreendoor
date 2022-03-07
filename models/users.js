var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    country : String,
    city : String,
    zipCode : String,
    address : String
});

var orderSchema = mongoose.Schema({
    price : Number,
    deliveryService: String,
    orderDate : {type: Date, default: Date.now},
    articles : [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}]
});

var userSchema = mongoose.Schema({
    token : String,
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    addresses : [addressSchema],
    orders : [orderSchema]
});

module.exports = mongoose.model('users', userSchema)