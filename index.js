const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()

var helpers = require("./serverHelper");
var database
app.use(bodyParser.json());

MongoClient.connect(
  "***REMOVED***",
  (err, database) => {
    if (err) 
      return err;
    
    app.listen(3001, () => 
        console.log('localhost 3001')
    )

    require("./routes.js")(app, database, helpers, bodyParser);
  }
);

