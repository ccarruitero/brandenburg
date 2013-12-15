var express = require('express');
var app = express();
var users = require('./users');

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
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
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id,',users.deleteUser);

app.listen(3000);
console.log('brandenburg is ready :D!');
