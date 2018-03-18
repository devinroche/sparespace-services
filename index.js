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
app.use(cors());

const server = app.listen(port);
const io = require('socket.io')(server)
ioHelper(io)

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'https://inspiring-goldstine-bc424a.netlify.com');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
});

routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT, { useMongoClient: true });

module.exports = app;
