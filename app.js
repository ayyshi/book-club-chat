'use strict';

const express     = require('express');
const app         = express();
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const request     = require('request');
const bodyParser  = require('body-parser');
const logger      = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/book-club');

/* check if connected to mongoose */
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongoose connected');
});

const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* add angular static route */
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(searchRoutes);
app.use(userRoutes);

server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
