const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const ioHelper = require('./controllers/ioHelper')
const routes = require('./routes/routes');


require('dotenv').load();

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = app.listen(port);
const io = require('socket.io')(server)
const p2p = require('socket.io-p2p-server').Server;
io.use(p2p);
ioHelper(io)

routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT, { useMongoClient: true });

module.exports = app;
