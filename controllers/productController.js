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

//Get the details of one product 
exports.product_detail = function(req, res){
    //get the id from req
    var id = req.params.id;

    Product.findOne({_id:id}).exec(function(err, product){
        //Display errors if there are any
        if(err)console.log(err);

        //Render the product detail page 
        res.render('product_detail', {product:product, products: products});
    })
}

//Display product create form on GET
exports.product_create_get = function(req, res){
    //check if user is logged in
    
    //create a JS object to store data
    var pageData = {
        //Must match the collection from MongoDB, product_form ids and the Product model
        productId: "",
        productName: "",
        productPrice: ""
    }

    //Render the product create form
    res.render('product_form', pageData);

    //Else redirect user back to log in page
    
}

//Handle product create on POST
exports.product_create_post = function(req, res){
    //Get the body data from product form
    var productId = req.body.productId;
    var productName = req.body.productName;
    var productPrice = req.body.productPrice;

    var pageData = {
        productId: productId,
        productName: productName,
        productPrice: productPrice
    }

    //Pass data and create a new product model instance 
    var newProduct = new Product(pageData)

    //Save the new product to MongoDB
    newProduct.save().then(()=> console.log('New product created'));

    //Renders a success message
    res.render('success', {action: 'Created a new product'});
}