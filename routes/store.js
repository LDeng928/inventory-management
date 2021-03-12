var express = require('express');
var router = express.Router();

//Require controller modules
var store_controller = require('../controllers/storeController');

//GET request for creating a new store. 
router.get('/create', store_controller.store_create_get);

//POST request for creasting a new store.
router.post('/create', store_controller.store_create_post);

//GET request for delete a store
router.get('/:id/delete', store_controller.store_delete_get);

//GET request for update a store
router.get('/:id/update', store_controller.store_update_get);

// //POST request for update a store
router.post('/:id/update', store_controller.store_update_post);

//GET request for list of all Stores
router.get('/list', store_controller.store_list_get);

//GET request for displaying one store details
//router.get('/:id/detail', store_controller.store_detail);

module.exports = router;