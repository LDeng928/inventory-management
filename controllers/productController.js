//Request dependencies
//Request model
var Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const {readyState} = require('../models/db');
const {json} = require('express');

// Display all products as a list
exports.product_list_get = function(req, res){
    //Check if the user is loggin in
    Product.find({}).exec(function(err, products){
        console.log(err);
        //Renders the prduct_list view
        //Gets the products data from MongoDB
        res.render('product_list', {products: products, pageurl: 'product_list'});
    });
}