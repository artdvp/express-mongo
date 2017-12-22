require('env2')('.env');    // loads all entries into process.env

//Import the mongoose module
var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COL}`;
// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;

// console.log(mongoDB);
//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connect('mongodb://ad_min:mdb7499312@ds013951.mlab.com:13951/nodemdb', function(error){
    if(error) {
        console.log(error)
    } else {
    console.log("connection successful");
    }
});