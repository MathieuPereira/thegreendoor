var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    country: String,
    city: String,
    zipCode: String,
    address: String,
});

var articleSchema = mongoose.Schema({
    price: Number,
    quantity: Number,
    size: String,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'articles'},
});

var orderSchema = mongoose.Schema({
    price: Number,
    deliveryService: String,
    deliveryPrice: Number,
    orderDate: {type: Date, default: Date.now},
    articles: [articleSchema],
});

var userSchema = mongoose.Schema({
    token: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    addresses: [addressSchema],
    orders: [orderSchema],
});

module.exports = mongoose.model('users', userSchema);