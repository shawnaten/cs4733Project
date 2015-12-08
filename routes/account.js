// Handles all logic for /account endpoints.

var APIUser = require('../modules/APIUser');
var BankUser = require('../modules/BankUser');
var bcrypt = require('bcrypt');
var emailTransporter = require('../modules/emailTransporter');
var nodemailer = require('nodemailer');
var express = require('express');
var randomToken = require('random-token');
var router = express.Router();
var jsonRes = require('../modules/jsonRes');

// Create account
router.get(/create\/\d+/, function(req, res, next) {
  var email = req.query.email;
  var id = req.path.match(/create\/(\d+)/)[1];
  var name = req.query.name;
  var ssn = req.query.ssn;

  var bankQuery = BankUser.findOne({ id: id, name: name, ssn: ssn });
  bankQuery.exec(bankQueryCallback);

  function bankQueryCallback(err, existingUser) {
    if (err) return console.error(err);
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
        if (err)return console.error(err);
        user.save(function (err, apiUser) {
          if (err) return console.error(err);
          res.send({ meta: { code: 200 }, });
        });
      });
    }
  }

});

// Change password
router.get(/password\/.+/, function(req, res, next) {
  var email = req.path.match(/password\/(.+)/)[1];
  var newPass = req.query.new_password;
  var oldPass = req.query.old_password;

  APIUser.findByEmail(email, oldPass, findCB);

  function findCB(user) {
    if (!user) {
      console.log('/account/password: Invalid login credentials.');
      res.send(jsonRes.loginInvalid);
    }
    else
      APIUser.setPassword(user, newPass, passCB);
  }

  function passCB(user) {
    if (!user) {
      console.error('/account/password: Failed generating hash.');
      res.send(jsonRes.undef);
    }
    else
      user.save(saveCB);
  }

  function saveCB(err, user) {
    if (err || !user) {
      console.error('/account/password: Failed saving to DB.');
      res.send(jsonRes.undef);
    }
    else
      res.send(jsonRes.okay);
  }

});

// Change email
router.get(/email\/.+/, function(req, res, next) {
  var newEmail = req.query.new_email;
  var oldEmail = req.path.match(/email\/(.+)/)[1];
  var pass = req.query.password;

  APIUser.findByEmail(oldEmail, pass, findCB);

  function findCB(user) {
    if (!user) {
      console.log('/account/email: Invalid login credentials.');
      res.send(jsonRes.loginInvalid);
    }
    else {
      user.email = newEmail;
      user.save(saveCB);
    }
  }

  function saveCB(err, user) {
    if (err || !user) {
      console.error('/account/email: Failed saving to DB.');
      res.send(jsonRes.undef);
    }
    else {
      var mailOptions = {
        to: "<"+newEmail+">",
        from: "CS4773 Node-API "+"<utsa.cs.4733.restful.node@gmail.com>",
        subject: "Email Confirmation",
        text: "Your email has been changd.",
      };

      res.send(jsonRes.okay);
      emailTransporter.sendMail(mailOptions, emailCB);
    }
  }

  function emailCB(err, info) {
    if (err)
      console.error('/account/email: Failed sending confirmation.');
  }

});

// Delete account, initiate
router.get(/delete\/initiate\/.+/, function(req, res, next) {
  var email = req.path.match(/delete\/initiate\/(.+)/)[1];
  var pass = req.query.password;
  var token = randomToken(16);

  APIUser.findByEmail(email, pass, findCB);

  function findCB(user) {
    if (!user) {
      console.log('/account/delete/initiate: Invalid login credentials.');
      res.send(jsonRes.loginInvalid);
    }
    else {
      var mailOptions = {
        to: "<"+email+">",
        from: "CS4773 Node-API "+"<utsa.cs.4733.restful.node@gmail.com>",
        subject: "Account Deletion Confirmation",
        text: "🔑 == " + token,
      };

      res.send(jsonRes.okay);
      emailTransporter.sendMail(mailOptions, emailCB);
    }
  }

  function emailCB(err, info) {
    if (err)
      console.error('/account/delete/initiate: Failed sending confirmation.');
  }

});

// Delete account, confirm
router.get(/delete\/confirm\/.+/, function(req, res, next) {
  var email = req.path.match(/delete\/confirm\/(.+)/)[1];
  var pass = req.query.password;
  var token = req.query.token;

  APIUser.findByEmail(email, pass, findCB);

  function findCB(user) {
    if (!user) {
      console.log('/account/delete/confirm: Invalid login credentials.');
      res.send(jsonRes.loginInvalid);
    }
    else
      user.remove(removeCB);
  }

  function removeCB(err) {
    if (err) {
      console.log('/account/delete/confirm: Failed to remove from DB.');
      res.send(jsonRes.undef);
    }
    else {
      var mailOptions = {
        to: "<"+email+">",
        from: "CS4773 Node-API "+"<utsa.cs.4733.restful.node@gmail.com>",
        subject: "Account Deletion Confirmation",
        text: "Your account has been deleted.",
      };

      res.send(jsonRes.okay);
      emailTransporter.sendMail(mailOptions, emailCB);
    }
  }

  function emailCB(err, info) {
    if (err)
      console.error('/account/delete/confirm: Failed sending confirmation.');
  }

});

module.exports = router;
