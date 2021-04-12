var express = require("express");
var router = express.Router();

// require controller
var order_controller = require("../controllers/orderController");

// create new order get
router.get("/create", order_controller.order_create_get);

// create new order post
router.post("/create", order_controller.order_create_post);

// get request for deleting an order
router.get("/:id/delete", order_controller.order_delete_get);

// order update get
router.get("/:id/update", order_controller.order_update_get);

// order update post
router.post("/:id/update", order_controller.order_update_post);

// order details get
router.get(":id/detail", order_controller.order_detail);

// get list of orders
router.get("/list", order_controller.order_list_get);

//Export module
module.exports = router;
