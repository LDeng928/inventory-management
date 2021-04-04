// Require mongoose
var mongoose = require("mongoose");
//const { Int } = require('mssql');

// Set up Product model
const Product = mongoose.model("Product", {
  productId: Number,
  productName: String,
  productPrice: Number,
  productCost: Number,
  category: String,
  storeName: String,
  warehouseQty: Number,
  storeQty: Number,
});

//Export the model
module.exports = Product;
