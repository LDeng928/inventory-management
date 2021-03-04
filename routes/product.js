//Require depencies 
var express = require('express');
var router = express.Router();

//Require controller modules
var product_controller = require('../controllers/productController');

// GET request for creating a new product. NOTE this route needs to come before

router.get('/create', product_controller.product_create_get); //Calls the product_create_get controller from product_controller. 

//POST request for creating product. Calls the product_create_post controller
router.post('/create', product_controller.product_create_post);

//GET request for deleting a product
router.get('/:id/delete', product_controller.product_delete_get);

//GET request for updateing a product
router.get('/:id/update', product_controller.product_update_get);

//POST request for updateing a product
router.post('/:id/update', product_controller.product_update_post);

//GET request to display one product detail
router.get('/:id/detail', product_controller.product_detail);

//GET request to display all products as a list
router.get('/list', product_controller.product_list_get);

//Export module
module.exports = router;