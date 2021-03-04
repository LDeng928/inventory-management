//Require Mongoose
var mongoose = require('mongoose');
const Store = mongoose.model('Store', {
    streetAddress: String,
    city: String,
    phoneNumber: String,
    storeManager: String,
    storeName: String,
    openingHours: String
})

//Export model
module.exports = Store;