var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 3000;

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '../client'));
  app.engine('html');
  // app.use(express.session({
  //   secret: 'mozilla-persona'
  // }));
});

// Websocket setup
var io = require('socket.io').listen(server);

io.configure(function () {
  io.set('transports', ['websocket', 'xhr-polling']);
  io.set('polling duration', 10);
  io.set('log level', 1);
});

// routes
require('./routes')(app, io);

server.listen(port);
console.log('brandenburg is ready :D!');
