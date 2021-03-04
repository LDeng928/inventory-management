const mongoose = require('mongoose');
const { use } = require('../routes');
const db = require('./db');

const User = mongoose.model('User', {
    username: String,
    password: String
})

module.exports = User;