var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.userLoggedIn) {
    res.render("report");
  } else {
    res.redirect("/users");
  }
});

module.exports = router;
