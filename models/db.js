//set up MongoDB connection
//import the mongoose module
require('dotenv').config();
const mongoose = require('mongoose');
//set up MongoDB Altas connection

const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;
//Show message
db.once('open', (err) => {
  console.log('db connected');
});
//Console log errors
db.on('error', console.error.bind(console, 'MongoDB connection error'));
//Export module
module.exports = db;
