/**
 * Created by Sohail on 10/24/15.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var user = require('../config/models');
var appName = "Node.js bank";
var CustomMail = require('../config/emailAdapter');
exports.cemail = function(emailo,emailn,pass,callback) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailo == emailn){
        callback({'response':"email must be different from previous email",'res':false});
        process.exit(100)

    }

    //check if email valid
    if(!emailn.match(mailformat))
    {
        callback({'response':"email is not valid"});
        process.exit(100)

    }

    user.find({ email: emailo }, function (err, users) {

        if(users.length != 0) {

            var temp = users[0].salt;
            var hash_db = users[0].hashed_password;
            var newpass = temp + pass;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            if (hash_db == hashed_password) {
                users[0].email = emailn;
                users[0].save();
                callback({'response': "Email Sucessfully Changed", 'res': true});
                //create new instance customEmail
                var customMail = new CustomMail(emailo, appName + ': Account Alert', 'newemail', users[0]);
                customMail.send(function (err) {
                    // if an error occurs
                    if (err) return console.log("failed to send email");
                    //on success
                    console.log("email sent ");
                });
            }
            else {
                callback({'response': "Password is not correct", 'res': false});
            }
        }
        else{
            callback({'response': "email don't exist", 'res': false});
        }
    });

}


