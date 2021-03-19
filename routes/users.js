var express = require("express");
var router = express.Router();

var user_controller = require("../controllers/userController");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", user_controller.log_in_get);

router.post("/", user_controller.log_in_post);

router.get("/logout", user_controller.log_out_get);

router.get("/register", user_controller.register_get);

router.post("/register", user_controller.register_post);

module.exports = router;
