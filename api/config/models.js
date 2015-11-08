/**
 * Created by Sohail on 11/6/15.
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  token : String,
  email: String,
  username: String,
  hashed_password: String,
  temp_password: String,
  salt: String,
  bank_id: Number,
  name: String,
  ssn: Number,
});

var User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost:27017/api');


// make this available to our users in our Node applications
module.exports = User;