//Require the store model
//Create a StoreModel by requiring the module
var Store = require('../models/store');
const fs = require('fs');
const path = require('path');
const {readyState} = require('../models/db');
const {json} = require('express');


//Use StoreModel object (model) to find all StoreModel records
//Display all stores as list
exports.store_list_get = function(req, res) {
    //Check user is logged in
    if(req.session.userLoggedIn){
        Store.find({}).exec(function(err, stores){
            //fs.writeFileSync(path.join(__dirname,'..','/public/store.json'), JSON.stringify(stores))
            console.log(err);
            res.render('store_list', {stores: stores, pageurl: 'store_list'});
        });
    }
    else{
        res.redirect('/users');
    }
}

//Store create GET function
exports.store_create_get = function(req, res) {
    //Check if user is logged in
    if(req.session.userLoggedIn){
        var pageData = {
            //Match the collection from MongoDB
        streetAddress: "",
        city: "",
        phoneNumber: "",
        storeManager: "",
        storeName: "",
        openingHours: ""
        }
        //Need to create a view called store_form
        res.render("store_form", pageData);
    }
    else{
        res.redirect('/users');
    }
}

//Create store POST
exports.store_create_post = function(req, res){
    var streetAddress = req.body.streetAddress;
    var city = req.body.city;
    var phoneNumber = req.body.phoneNumber;
    var storeManager = req.body.storeManager;
    var storeName = req.body.storeName;
    var openingHours = req.body.openingHours;

    var pageData = {
        streetAddress: streetAddress,
        city: city,
        phoneNumber: phoneNumber,
        storeManager: storeManager,
        storeName: storeName,
        openingHours: openingHours
    }

    var newStore = new Store(pageData);

    newStore.save().then(() => console.log("New store created."));

    res.render('success', {action: 'Created a new store '});
}

exports.store_delete_get = function(req, res){
    res.render("waiting for a response");
}

exports.store_update_get = function(req, res){
    res.render("waiting for a response");
}

exports.store_update_post = function(req, res){
    res.render("waiting for a response");
}
