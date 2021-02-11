var express = require('express');
var router = express.Router();

//Require controller modules
var store_controller = require('../controllers/storeController');

//GET request for list of all Stores
router.get('/list', store_controller.store_list_get);

module.exports = router;