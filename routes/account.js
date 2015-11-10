var assert = require('assert');
var BankUser = require('../modules/BankUser');
var express = require('express');
var router = express.Router();

// Create account
router.get('/create', function(req, res, next) {
  BankUser.find(function (err, bankUsers) {
    if (err) return console.error(err);
    res.send({ meta: { code: 501 }, data: bankUsers });
  });
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
