const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require("./models/userModel")
const port = process.env.PORT || 3001
const app = express()

var helpers = require("./controllers/serverHelper")
const routes = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.listen(port)

mongoose.Promise = global.Promise
mongoose.connect("mongodb://admin:password@ds044689.mlab.com:44689/sparespacedb")

require("./routes/routes.js")(app, bodyParser)