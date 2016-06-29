// YOUR CODE HERE:
var app = {};

$(document).ready(function() {

  var username = window.location.search.replace('?username=', '');

  var e = document.getElementById('roomSelect');
  var roomname = e.options[e.selectedIndex].value;

  app.init = function(){
    return true;
  }

  app.handleSubmit = function(message){
    //message = app.escape(message);
    app.send(message);
    app.updateRoom();
    var obj = {
      username: username,
      text: message,
      roomname: roomname
    }
    app.addMessage(obj);
  };

  app.send = function(message){
    app.updateRoom();

    var obj = {
      username: username,
      text: message,
      roomname: roomname
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(obj),
      url: 'http://127.0.0.1:3000/classes/chatterbox',

      success: function(data){
        app.fetch()
      },
      error: function(data){
        console.log(error);
      }
    });
  }

  app.fetch = function(callback){
    $.ajax({
      type: 'GET',
      data: {order: '-createdAt'},
      url: 'http://127.0.0.1:3000/classes/chatterbox',
      success: function(data){
        console.log(data);
        var filtered = data.results.filter(function(obj){
          return callback(obj);
        });
        //Clear the previous messages before adding new data
        app.clearMessages();
        filtered.forEach(function(obj) {
          app.addMessage(obj);
        });
      },
      error: function(data){
        console.log('error');
      }
    });
  }

  app.clearMessages = function(){
    $('#chats').empty();
  }

  app.addMessage = function(obj){
    var userName = "<p class = 'username'>" + obj.username + "</p>";
    var text = '<p  class = "text">' + app.escape(obj.text) + '</p>';
    var chatRoom = '<p class = "room roomname">' + obj.roomname + '</p>';
    obj = '<div class = "chat">' + userName + text  + chatRoom + '</div>';
    $('#chats').append(obj);
  }

  app.addRoom = function(){
    console.log('hi');
    var room = prompt('What is the room called?');
    room = '<option value=' + room + '>' + room + '</option>';
    $('#roomSelect').append(room);
  }

  app.addFriend = function(name){
    $("#friends").append('<div>' + name + '</div>');
  };

  //function that blocks xss attacks
  app.escape = function(msg) {
    return msg.split('').reduce(function(memo, item){
      if (item === '<') {
        item = '&lt';
      }
      if (item === '>') {
        item = '&gt';
      }
      if (item === '&') {
        item = '&amp';
      }
      memo+=item;
      return memo;
    }, '');
  }

  //function that updates the room to whatever the user is currently in
  app.updateRoom = function() {
    //sets `roomname` to whatever option is currently selected
    roomname = e.options[e.selectedIndex].value;
  }

  $(".submit").on( "click" , function(){
    app.handleSubmit($("#message").val());
    //var thing = $("#message").val()
    $("#message").val('');
  });

  $('#roomButton').click(function() {
    app.clearMessages();
    app.updateRoom();
    if(roomname === 'roomAdd'){ //NEEDS TO BE FIXED
      app.addRoom();
    }else{
      app.fetch(function(obj){
        return obj.roomname === roomname;
      });
    }
  });

  $("#chats").on("click", ".username", function(){
    app.addFriend($(this).text());
  });
});