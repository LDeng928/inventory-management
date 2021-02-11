//Require Mongoose
var mongoose = require('mongoose');
const Store = mongoose.model('Store', {
    address: String,
    phoneNumber: String,
    storeManager: String
})

//Export model
module.exports = Store;