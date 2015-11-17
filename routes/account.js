var APIUser = require('../modules/APIUser');
var BankUser = require('../modules/BankUser');
var bcrypt = require('bcrypt');
var emailTransporter = require('../modules/emailTransporter');
var nodemailer = require('nodemailer');
var express = require('express');
var randomToken = require('random-token');
var router = express.Router();

// Create account
router.post(/create\/\d+/, function(req, res, next) {
  var email = req.query.email;
  var id = req.path.match(/create\/(\d+)/)[1];
  var name = req.query.name;
  var ssn = req.query.ssn;

  var bankQuery = BankUser.findOne({ id: id, name: name, ssn: ssn });
  bankQuery.exec(bankQueryCallback);

  function bankQueryCallback(err, existingUser) {
    if (err) return console.err(err);
    if (existingUser) {
      var apiQuery = APIUser.findOne({ id: id });
      apiQuery.exec(apiQueryCallback);
    }
    else
      res.send({ meta: { code: 404, cause: 'user not found', } });
  }

  function apiQueryCallback(err, existingUser) {
    if (existingUser)
      res.send({ meta: { code: 404, cause: 'account exists', } });
    else {
      var token = randomToken(16);
      var hash = bcrypt.hashSync(token, 10);
      var user = new APIUser({ email: email, id: id, password: hash, });

      var mailOptions = {
        to: name+" <"+email+">",
        from: "CS4773 Node-API "+"<utsa.cs.4733.restful.node@gmail.com>",
        subject: "Email Confirmation",
        text: "🔑 == " + token,
      };

      emailTransporter.sendMail(mailOptions, function(err, info) {
        if (err)return console.log(err);
        user.save(function (err, apiUser) {
          if (err) return console.log(err);
          res.send({ meta: { code: 200 }, });
        });
      });
    }
  }

});

// Change password
router.get('/password/*', function(req, res, next) {

  var apiQuery = APIUser.findOne({ id: id });
  apiQuery.exec(apiQueryCallback);

  function apiQueryCallback(err, existingUser) {
    if (!existingUser) {
      res.send({ meta: { code: 404, cause: 'login ivalid', } });
    } else {

    }
  }
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
