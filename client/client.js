var messageArray = document.getElementById('messages');

messageArray = [];

var socket = io('ws://localhost:3000');
  socket.on('notify', function (data) {
    messageArray.push(data);
    socket.emit('message', { message: 'data' });
  });