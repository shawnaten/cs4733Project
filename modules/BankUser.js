// Class representing user in Bank's DB.
// Outlines DB schema.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bankUserSchema = new Schema({
  id: Number,
  name: String,
  role: String,
  ssn: Number,
});

var conn = mongoose.createConnection('mongodb://db/bank');
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {

});

module.exports = conn.model('User', bankUserSchema);
