// require model
var Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const { readyState } = require("../models/db");
const { json } = require("express");

//order create get
exports.order_create_get = function (req, res) {
  res.send("Not implemented.");
};

//order create post
exports.order_create_post = function (req, res) {
  res.send("Not implemented");
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
