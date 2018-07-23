var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

http.listen(3000, function(){
    console.log('listening on *:3000');
  });

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
  });


io.on('connection', function(socket) {
  console.log('a new client is here!');
    
  socket.emit('notify', { message : 'Connected to server'});

	socket.on('disconnect', function() {
		console.log('User has left. :(');
	});


	socket.on('message', function(from, msg) {
		console.log('You have received a message from ', from, ': ', msg );
  });
  
  socket.on('locate', function(data) {
    socket.broadcast.emit('cursorAction', { session_id: socket.id, coord: data });
  })
});