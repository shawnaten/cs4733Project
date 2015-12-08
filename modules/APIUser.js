// Class for a user in our messaging service.
// Outlines DB schema and handles common functions for APIUser objects.

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var APIUserSchema = new Schema({
  id: Number,
  email: String,
  password: String
});

var conn = mongoose.createConnection('mongodb://db/api');
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) { });

var model = conn.model('User', APIUserSchema);

model.findByEmail = function (email, pass, callback) {
  var user;

  model.findOne({ email: email }, findCB);

  function findCB(err, foundUser) {
    if (err || !foundUser) {
      callback(null);
      console.error('APIUser: user not found by email (' + email + ')');
    }
    else {
      user = foundUser;
      bcrypt.compare(pass, user.password, bcryptCB);
    }
  }

  function bcryptCB(err, result) {
    if (err || !result)
      callback(null);
    else
      callback(user);
  }
};

// Takes a plaintext password and creates a hash. Doesn't access DB.
model.setPassword = function(user, newPass, callback) {
  bcrypt.hash(newPass, 10, hashCB);

  function hashCB(err, hash) {
    if (err)
      callback(null);
    else {
      user.password = hash;
      callback(user);
    }
  }
};

module.exports = model;
