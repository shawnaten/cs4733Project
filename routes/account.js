var APIUser = require('../modules/APIUser');
var BankUser = require('../modules/BankUser');
var express = require('express');
var router = express.Router();

// Create account
router.post(/create\/\d+/, function(req, res, next) {
  var email = req.query.email;
  var id = req.path.match(/create\/(\d+)/)[1];
  var name = req.query.name;
  var ssn = req.query.ssn;

  var bankQueryCallback = function (err, existingUser) {
    if (err) return console.error(err);
    if (existingUser) {
      var apiQuery = APIUser.findOne({ id: id });
      apiQuery.exec(apiQueryCallback);
    }
    else
      res.send({ meta: { code: 404, cause: 'user not found', } });
  };

  var apiQueryCallback = function (err, existingUser) {
    if (existingUser)
      res.send({ meta: { code: 404, cause: 'account exists', } });
    else {
      var user = new APIUser({ email: email, id: id, password: 'password', });
      user.save(function (err, apiUser) {
        if (err) return console.error(err);
        res.send({ meta: { code: 200 } });
        // code to send email
      });
    }
  };

  var bankQuery = BankUser.findOne({ id: id, name: name, ssn: ssn });
  bankQuery.exec(bankQueryCallback);

});

// Change password
router.get('/password', function(req, res, next) {
  res.send({ meta : { code : 501 } });
});

// Change email
router.get('/email', function(req, res, next) {
  res.send({ meta : { code : 501 } });
});

// Delete account, initiate
router.get('/delete/initiate', function(req, res, next) {
  res.send({ meta : { code : 501 } });
});

// Delete account, confirm
router.get('/delete/confirm', function(req, res, next) {
  res.send({ meta : { code : 501 } });
});

module.exports = router;
