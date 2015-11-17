var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var APIUserSchema = new Schema({
  id: Number,
  email: String,
  password: String
});

var conn = mongoose.createConnection('mongodb://db/api');
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {

});

module.exports = conn.model('User', APIUserSchema);
