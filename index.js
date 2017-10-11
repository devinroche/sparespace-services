const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require("./models/userModel")
require('dotenv').load();
var cookieParser = require('cookie-parser');

var expressValidator = require('express-validator');

const port = process.env.PORT || 3001
const app = express()

var helpers = require("./controllers/serverHelper")
const routes = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); 
app.use(cors())

routes(app);
app.listen(port)

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_CONNECT)
var db = mongoose.connection;

require("./routes/routes.js")(app, bodyParser)