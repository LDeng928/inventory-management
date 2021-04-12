// require model
var Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const { readyState } = require("../models/db");
const { json } = require("express");

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
  //res.send("Not implemented");
  if (req.session.userLoggedIn) {
    var id = req.params.id;

    Order.findByIdAndDelete({ _id: id }).exec(function (err, order) {
      if (order) {
        res.render("success", { action: "Order removed." });
      } else {
        res.render("error", {
          message: "Order not found. Please try again.",
        });
      }
    });
  }
  //Else redirect back to log in page
  else {
    res.redirect("/users");
  }
};

// order update get
exports.order_update_get = function (req, res) {
  //res.send("Not implemented");
  var id = req.params.id;

  if (req.session.userLoggedIn) {
    Order.findOne({ _id: id }).exec(function (err, order) {
      if (err) console.log(err);

      var pageData = {
        productId: order.productId,
        productName: order.productName,
        category: order.category,
        orderQty: order.orderQty,
        productPrice: order.productPrice,
        orderTotal: order.orderTotal,
      };
      res.render("order_form", pageData);
    });
  } else {
    res.redirect("/users");
  }
};

exports.order_update_post = function (req, res) {
  //res.send("Not implemented");
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

  var query = { _id: req.params.id };

  Order.updateOne(query, pageData, (err, doc) => {
    if (err) console.log(err);
    res.render("success", { action: "Updated order" });
  });
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
