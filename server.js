var connect = require('connect')
  , http = require('http')
  , socketIo = require('socket.io')
  , clients = []
  , app = connect().use(connect.static('public'))
  , server = http.createServer(app)
  , io = socketIo.listen(server);

server.listen(8080);
io.sockets.on('connection', function(socket) {
  socket.on('message', function(data, callback){
    socket.broadcast.json.send(data);
  });

  socket.on('new', function(data, callback) {
    clients.push(data.name);
    var index = clients.lastIndexOf(data.name);

    socket.set('userIndex', index);
    socket.broadcast.emit('new', { id: index, who: data.name });
    callback(clients);
  });

  socket.on('disconnect', function(){
    socket.get('userIndex', function(err, index){
      socket.broadcast.emit('leave', { id: index, message: { author: clients[index], message: 'Saiu da sala.' } });
      clients.splice(index, 1);
    });
  });
});