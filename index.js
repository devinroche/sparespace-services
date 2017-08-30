const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

var helpers = require("./serverHelper");
var database
MongoClient.connect(
  "mongodb://admin:password@ds044689.mlab.com:44689/sparespacedb",
  (err, database) => {
    if (err) 
      return err;
    
    console.log("Connected to database")
    app.listen(3000, () => {
        console.log('localhost 3000')
    })
    console.log(database)
    require("./routes.js")(app, database, app)
  }
);

