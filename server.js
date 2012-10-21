var connect = require('connect')
  , http = require('http')
  , io = require('socket.io');

var clients = [];

var app = connect().use(connect.static('public'));
var server = http.createServer(app);
io = io.listen(server);

server.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.on('message', function(data,callback){
    socket.broadcast.json.send(data);
  });

  socket.on('new', function (data,callback) {
    socket.set('nickname',data.name);
    clients.push(data.name);
    socket.broadcast.emit('new',data.name);
    callback(clients);
  });

  socket.on('disconnect',function(){
    socket.get('nickname',function(err,name){
      var index = clients.indexOf(name);
      clients.splice(index, 1);
      socket.broadcast.emit('leave',name);
    });
  });
});