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