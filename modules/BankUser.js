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

//module.exports = conn.model('User', bankUserSchema);

var model = conn.model('User', bankUserSchema);

model.findByName = function (name, callback) {

  model.findOne({ name: name }, findCB);

  function findCB(err, foundUser) {
    if (err || !foundUser) {
      callback(null);
      console.error('BankUser: user not found by name (' + name + ')');
    }
    else {
      var to = foundUser.id;
      callback(to);
    }
  }
};

module.exports = model;