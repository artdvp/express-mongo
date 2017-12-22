// Recommended driver settings for the Mongoose 4.3.x driver.

var mongoose = require('mongoose');    

var uri = 'mongodb://madmin:macd3@ds013951.mlab.com:13951/nodemdb';

var options = {
  "server" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  },
  "replset" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  }
}

mongoose.connect(uri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));