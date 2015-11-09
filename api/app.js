/**
 * Created by Sohail on 11/2/15.
 */
/**
 * Module dependencies.
 */
var express  = require('express');
var connect = require('connect');
var app = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var http = require('http');
var ejs = require('ejs');
var mongoose = require ('mongoose');
var reg = require('./config/register');
var login = require('./config/login');
var User = require('./config/models');
var chgpass = require('./config/chgpass');
var chgemail = require('./config/chgemail');

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());

console.log('server running on port 3000');

app.listen(port,ip);

// Routes
require('./routes/routes.js')(app);

//Show all users
User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
        userMap[user._id] = user;

    });

    return console.log(userMap);
});


