'use strict';

let socket = io();
let myUser;

$(function(){
  // hide current chat from users not logged into the chat
  $('.current-chat').hide();

  $('#login-input').keypress(function(event){
    if(event.keyCode === 13){
      var username = $('#login-input').val();
      myUser = username;
      // send to server
      socket.emit('add user', username + ' joined the room');
      $('.current-chat').show();
      $('#login-input').val('');
      $('#loginpage').hide();
    }
  });

  $('#message').keypress(function(event){
    if(event.keyCode === 13){
      var message = $('#message').val();
      socket.emit('send message', {name: myUser, message: message})
      $('#message').val('');
    }
  })

});



// SOCKET events

socket.on('user joined', function(users){
  var usersList = $('#users ul');
  usersList.empty();
  users.forEach(function(user){
    var userElement = $('<li>');
    userElement.text(user.name);
    usersList.append(userElement);
  });
});

socket.on('send message', function(data){
  var chatList = $('#messages');
  var message = $('<li>');
  message.text(data.name + " : " + data.message);
  chatList.append(message);
});
