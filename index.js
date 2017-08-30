const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()

var helpers = require("./serverHelper");
var database
app.use(bodyParser.json());

MongoClient.connect(
  "mongodb://admin:password@ds044689.mlab.com:44689/sparespacedb",
  (err, database) => {
    if (err) 
      return err;
    
    app.listen(3000, () => 
        console.log('localhost 3000')
    )

    require("./routes.js")(app, database, helpers, bodyParser);
  }
);

