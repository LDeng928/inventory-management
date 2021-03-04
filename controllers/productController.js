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
    if(req.session.userLoggedIn){
    //create a JS object to store data
    var pageData = {
        //Must match the collection from MongoDB, product_form ids and the Product model
        productId: "",
        productName: "",
        productPrice: "",
        category: "",
        storeName: "",
        warehouseQty: "",
        storeQty: ""
    }

    //Render the product create form
    res.render('product_form', pageData);
    }
    //Else redirect user back to log in page
    else {
        res.redirect('/users');
    }
}

//Handle product create on POST
exports.product_create_post = function(req, res){
    //Get the body data from product form
    var productId = req.body.productId;
    var productName = req.body.productName;
    var productPrice = req.body.productPrice;
    var category = req.body.category;
    var storeName = req.body.storeName;
    var warehouseQty = req.body.warehouseQty;
    var storeQty = req.body.storeQty;

    var pageData = {
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        category: category,
        storeName: storeName,
        warehouseQty: warehouseQty,
        storeQty: storeQty
    }

    //Pass data and create a new product model instance 
    var newProduct = new Product(pageData)

    //Save the new product to MongoDB
    newProduct.save().then(()=> console.log('New product created'));

    //Renders a success message
    res.render('success', {action: 'Created a new product'});
}

//Delete product on GET
exports.product_delete_get = function(req, res){
    if(req.session.userLoggedIn){
        var id = req.params.id;

        Product.findByIdAndDelete({_id: id}).exec(function(err, product){
            if(product){
                res.render('success', {action: "Product removed."});
            }
            else{
                res.render('error', {message: "Product not found. Please try again."});
            }
        });               
    }
     //Else redirect back to log in page
    else{
            res.redirect('/users');
        }
}

//Display product update form on GET
exports.product_update_get = function(req, res){
    var id = req.params.id;

    if(req.session.userLoggedIn){
        Product.findOne({_id: id}).exec(function(err, product){
            if(err)console.log(err);

            var pageData = {
                productId: product.productId,
                productName: product.productName,
                productPrice: product.productPrice,
                category: product.category,
                storeName: product.storeName,
                warehouseQty: product.warehouseQty,
                storeQty: product.storeQty
            }
            res.render('product_form', pageData);
        });
    }
    else{
        res.redirect('/users');
    }
}

//Hanlde product update on POST
exports.product_update_post = function(req, res){
    var productId = req.body.productId;
    var productName = req.body.productName;
    var productPrice = req.body.productPrice;
    var category = req.body.category;
    var storeName = req.body.storeName;
    var warehouseQty = req.body.warehouseQty;
    var storeQty = req.body.storeQty;
    if(err) console.log(err);

    var pageData = {
                productId: productId,
                productName: productName,
                productPrice: productPrice,
                category: category,
                storeName: storeName,
                warehouseQty: warehouseQty,
                storeQty: storeQty
    }

    var query = {_id:req.params.id}

    Product.updateOne(query, pageData, (err, doc)=>{
        if(err)console.log(err);
        res.render('success', {action: "Updated product"});
    })
};
