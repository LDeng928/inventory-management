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
    Store.find({}).exec(function(err, stores){
        //fs.writeFileSync(path.join(__dirname,'..','/public/store.json'), JSON.stringify(stores))
        console.log(err);
        res.render('store_list', {stores: stores, pageurl: 'store_list'});
    });
}