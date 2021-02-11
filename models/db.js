//set up MongoDB connection 
//import the mongoose module 
const mongoose = require('mongoose');
//set up MongoDB Altas connection
var mongoDB = 'mongodb+srv://coolUser:coolPassword@capstoneims.lyj4y.mongodb.net/CapstoneIMS?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
//Show message
db.once('open', (err) => {console.log('db connected')});
//Console log errors 
db.on('error', console.error.bind(console, 'MongoDB connection error'));
//Export module 
module.exports = db;