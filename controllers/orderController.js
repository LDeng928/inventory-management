// require model
var Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const { readyState } = require("../models/db");
const { json } = require("express");
const { DateTime } = require("mssql");

//order create get
exports.order_create_get = function (req, res) {
  //res.send("Not implemented.");
  //check if user is logged in
  if (req.session.userLoggedIn) {
    //create a JS object to store data
    var pageData = {
      //Must match the collection from MongoDB, product_form ids and the Product model
      productId: "",
      productName: "",
      category: "",
      orderQty: "",
      productPrice: "",
      orderTotal: "",
    };
    //Render the product create form
    res.render("order_form", pageData);
  }
  //Else redirect user back to log in page
  else {
    res.redirect("/users");
  }
};

//order create post
exports.order_create_post = function (req, res) {
  //res.send("Not implemented");
  //Get the body data from product form
  var productId = req.body.productId;
  var productName = req.body.productName;
  var category = req.body.category;
  var orderQty = req.body.orderQty;
  var productPrice = req.body.productPrice;
  var orderTotal = req.body.orderTotal;

  var pageData = {
    productId: productId,
    productName: productName,
    category: category,
    orderQty: orderQty,
    productPrice: productPrice,
    orderTotal: orderTotal,
  };

  //Pass data and create a new order model instance
  var newOrder = new Order(pageData);

  // save the new order to database
  newOrder.save().then(() => console.log("New order created!"));

  //Renders a success message
  res.render("success", { action: "Created a new order" });
};

// order delete get
exports.order_delete_get = function (req, res) {
  res.send("Not implemented");
};

// order update get
exports.order_update_get = function (req, res) {
  res.send("Not implemented");
};

exports.order_update_post = function (req, res) {
  res.send("Not implemented");
};

// order detail
exports.order_detail = function (req, res) {
  res.send("Not implemented");
};

// display current orders
exports.order_list_get = function (req, res) {
  //res.send("Not implemented: order list");
  if (req.session.userLoggedIn) {
    Order.find({}).exec(function (err, orders) {
      console.log(err);
      res.render("order_list", { orders: orders });
    });
  } else {
    res.redirect("/users");
  }
};
