const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const ioHelper = require('./controllers/ioHelper')
const routes = require('./routes/routes');

require('dotenv').load();

const port = process.env.PORT || 3001;
const app = express();

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://determined-boyd-bc21d2.netlify.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

const server = app.listen(port);
const io = require('socket.io')(server)
ioHelper(io)

routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT, { useMongoClient: true });

module.exports = app;
