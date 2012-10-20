var connect = require('connect')
  , http = require('http')
  , io = require('socket.io');

var app = connect().use(connect.static('public'));
var server = http.createServer(app);

io.listen(server);

server.listen(8080);