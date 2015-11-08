/**
 * Created by Sohail on 11/2/15.
 */
//class imports
var CustomMail = require('../config/emailAdapter');
var express = require('express');
var router = express.Router();
var models = require('../config/temp_models');

//data import
var email = models.user.email;
var message = models.user.message;
var appName = models.user.appName;


//create new instance customEmail
var customMail = new CustomMail(email, 'Welcome to '+appName, 'mail', models.user);

// send the email
//var send = customMail.send(function (err){
//
//    // if an error occurs
//    if(err) return console.log("failed to send email");
//    //on success
//    console.log("email sent ");
//});

console.log("email sent success");

//module.exports.customMail = send;