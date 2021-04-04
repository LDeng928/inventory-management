// require mongoose
var mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  productId: Number,
  productName: String,
  category: String,
  orderQty: Number,
  productPrice: Number,
  orderTotal: Number,
});

// export the model
module.exports = Order;
