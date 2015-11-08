/**
 * Created by Sohail on 11/6/15.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require ('mongoose');
var User = require('../config/models');
var CustomMail = require('../config/emailAdapter');
var express = require('express');
var pin = require('../config/pinGenerator');

//capatilize first letter
//String.prototype.capitalizeFirstLetter = function() {
//    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//}

//register
exports.register = function(email,accntid,ssn,name,callback){


    //for salt
    var temp =rand(160, 36);

    //temp password
    var temp_pswrd =  pin.pinGenerator;
    var temp_pswrd_hash = temp+temp_pswrd;

    //hashed token, pass
    var token = crypto.createHash('sha512').update(email +rand).digest("hex");
    var hashed_pass = crypto.createHash('sha512').update(temp_pswrd_hash).digest("hex");

    //regexp
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var  ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;

    //check if email valid
    if(!email.match(mailformat))
    {
        callback({'response':"email is not valid"});
        process.exit(100)

    }
    //check if ssn valid
    //if(!ssn.value.match(ssnPattern))
    //{
    //    callback({'response':"ssn is not valid"});
    //    process.exit(100)
    //
    //}


    //check if email exists
    User.find({email: email},function(err,users){

        var len = users.length;

        if(len > 0){
            callback({'response':"Email already exists"});
            process.exit(100)
        }
    });

    //check if username exists
    //User.find({username: usrnm},function(err,users){
    //
    //    var len = users.length;
    //
    //    if(len > 0){
    //        callback({'response':"Username already exists"});
    //        process.exit(100)
    //
    //    }
    //});

    //find user by (bank-id, ssn, fname,lname) than add email, username, token, temp_password
    User.findOne({bank_id: accntid, ssn:ssn, name:name}, function (err, userObj) {

        //error with mongoose
        if (err) {
            console.log(err);
            process.exit(100)

        }
        //if user found
        else if (userObj) {

            console.log('Found:', userObj);

            //set new parameters
            userObj.email = email;
            userObj.token = token;
            userObj.hashed_password = hashed_pass;
            userObj.temp_password = temp_pswrd;
            userObj.salt = temp;

            //save new user details
            userObj.save(function (err) {
                if (err) {
                    console.log(err);
                    process.exit(100)
                } else {
                    console.log('Updated', userObj);
                    //create new instance customEmail
                    var customMail = new CustomMail(email, 'Welcome to nodejs.Bank', 'welcome_email', userObj);
                    customMail.send(function (err){
                        // if an error occurs
                        if(err) return console.log("failed to send email");
                        //on success
                        console.log("email sent ");
                    });

                }
            });

        }
        //user not found
        else {
            console.log('User not found!');
            console.log(name_cp);
            process.exit(100)

        }
    });

}