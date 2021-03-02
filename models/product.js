// Require mongoose
var mongoose = require('mongoose');

// Set up Product model
const Product = mongoose.model('Product', {
    productId: Number,
    productName: String,
    productPrice: Number
});

//Export the model
module.exports = Product;
