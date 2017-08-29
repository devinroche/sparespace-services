const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

var helpers = require("./serverHelper");
MongoClient.connect(
  "***REMOVED***",
  (err, database) => {
    if (err) {
      return console.log(err);
    }
    db = database;
    console.log("Connected to database")
    app.listen(3000, ()=>{
        console.log('server 3000')
    })
    require("./routes.js")(app, db, app)
  }
);