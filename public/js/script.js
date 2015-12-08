'use strict';

let socket = io();
let myUser;
let newRoom;

$(function(){

  // chat starts on book selection or anon default
  $(document.body).on('click', 'button.start-chat', function(event){
    let username = window.prompt('enter username', 'username');
    myUser = username;
    socket.emit('add user', username + ' joined the room');
  });

  $('#message').keypress(function(event){
    if(event.keyCode === 13){
      let message = $('#message').val();
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
