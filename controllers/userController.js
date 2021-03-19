//request the user model
var User = require("../models/user");

//Display log in form on GET
exports.log_in_get = function (req, res) {
  console.log("Get login");
  res.render("log_in");
};

//Log in post
exports.log_in_post = function (req, res) {
  var user = req.body.username;
  var pwd = req.body.password;
  User.findOne({ username: user, password: pwd }, function (err, item) {
    if (err) console.log(err);
    if (item) {
      req.session.username = item.username;
      req.session.userLoggedIn = true;
      res.render("success", { action: "You have logged in" });
    } else {
      res.render("log_in", { error: "Please try again." });
    }
  });
};

//Log out
exports.log_out_get = function (req, res) {
  req.session.destroy();
  //redirect back to index page
  res.render("success", { action: "Logged out" });
};

//Register a new user
exports.register_get = function (req, res) {
  console.log("Get registered");
  //Get the register_form from views
  res.render("register_form");
};

//Register a new user - POST
exports.register_post = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  pageData = {
    username: username,
    password: password,
  };

  //Pass data and create a new user model instance
  var newUser = new User(pageData);

  //Save the new product to MongoDB
  newUser.save().then(() => console.log("New user created!"));

  //Renders a success message
  res.render("success", { action: "Created a new user" });
};
