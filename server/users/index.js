var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
var db = new Db('usersdb', server);

db.open(function(err, db){
  if(!err){
    console.log('connected to database');
    db.collection('users', {strict: true}, function(err, collection){
      if(err){
        console.log("users database doesn't exists. Creating ...");
      }
    });
  }
});

exports.findAll = function(req, res, next) {
  db.collection('users', function(err, collection){
    collection.find().toArray(function(err, items){
      res.jsonp(items);
    })
  });
};
 
exports.findById = function(req, res, next) {
  var id = req.params.id;
  db.collection('users', function(err, collection){
    collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item){
      res.jsonp(item);
    });
  });
};

exports.findByEmail = function(req, res, next) {
  var email = req.params.email;
  db.collection('users', function(err, collection){
    collection.findOne({'_email': new BSON.ObjectID(email)}, function(err, item){
      res.jsonp(item);
    });
  });
};

exports.addUser = function(req, res, next) {
  var user = req.body;
  console.log('Adding user: ' + JSON.stringify(user));
  db.collection('users', function(err, collection) {
    collection.insert(wine, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
};

exports.updateUser = function(req, res) {
  var id = req.params.id;
  var user = req.body;
  console.log('Updating user: ' + id);
  console.log(JSON.stringify(wine));
  db.collection('users', function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating user: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(user);
      }
    });
  });
}
 
exports.deleteUser = function(req, res) {
  var id = req.params.id;
  console.log('Deleting user: ' + id);
  db.collection('users', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
});
}
