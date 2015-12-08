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

const searchRoutes = require('./routes/searchRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* add angular static route */
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/search', searchRoutes);
app.use('/books', bookRoutes);

let users = [];
let roomName;
let addedUser = false;


// one namespace
io.on('connection', function(client){
  console.log('user has connected');

  // pass in object with two keys
  client.on('add user', function(obj){

    roomName = obj.bookname;

    client.join(roomName);

    let userObj = {};

    userObj.name = obj.username;
    userObj.id = client.id;
    users.push(userObj);
    addedUser = true;
    // emit sends to all clients in room
    io.to(roomName).emit('user joined', users);
  });

  client.on('send message', function(data){
    io.to(roomName).emit('send message', data);
  });

  client.on('disconnect', function(){
    console.log('user has disconnected');

    client.leave(roomName);

    if(addedUser){
      users.forEach(function(user){
        if(user.id === client.id){
          users.splice(users.indexOf(user), 1);
        }
      })
    }
    io.to(roomName).emit('user joined', users);
  });
});


server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
