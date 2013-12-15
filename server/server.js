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

app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id,',users.deleteUser);

app.listen(3000);
console.log('brandenburg is ready :D!');
