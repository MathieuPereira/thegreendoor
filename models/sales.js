var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    name : String, 
    img : String, 
    normalPrice : Number, 
    reducedPrice : Number,
    fastDesc : String,
    detailedDesc : String, 
});

var saleSchema = mongoose.Schema({
    categories : [String], 
    brandName : String,
    brandFastDesc : String, 
    brandDesc : String,
    brandLabels : [String], 
    startingDate : Date,
    endingDate : Date,
    maxDiscount : Number,
    articles : [articleSchema]
});

module.exports = mongoose.model('sales', saleSchema)