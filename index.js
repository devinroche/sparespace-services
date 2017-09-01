const express = require('express')
  MongoClient = require('mongodb').MongoClient
  bodyParser = require('body-parser')
  mongoose = require('mongoose')
  User = require("./models/userModel")
  port = process.env.PORT || 3001,
  app = express()

var helpers = require("./controllers/serverHelper");
  routes = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.listen(port)

mongoose.Promise = global.Promise
mongoose.connect("***REMOVED***")

require("./routes/routes.js")(app, bodyParser)

// MongoClient.connect(
//   "***REMOVED***",
//   (err, database) => {
//     if (err) 
//       return err;
    
//     app.listen(3001, () => 
//         console.log('localhost 3001')
//     )

//     require("./routes/routes.js")(app, database, bodyParser);
//   }
// );

