const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

var helpers = require("./serverHelper");
var database
MongoClient.connect(
  "***REMOVED***",
  (err, database) => {
    if (err) 
      return err;
    
    app.listen(3000, () => {
        console.log('localhost 3000')
    })

    require("./routes.js")(app, database, helpers)
  }
);

