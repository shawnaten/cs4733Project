/**
 * Created by Sohail on 11/7/15.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../config/models');
var CustomMail = require('../config/emailAdapter');

exports.status = function(eml,callback) {

    user.find({email: eml},function(err,users){

        if(users.length != 0){

            var temp = users[0].salt;
            var hash_db = users[0].hashed_password;
            var temp_pass = users[0].temp_password;
            var id = users[0].token;
            var newpass = temp + temp_pass;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
            if(hash_db == hashed_password){

                var customMail = new CustomMail(users[0].email, 'Bye Bye from nodejs.Bank', 'accountdeleted', users[0]);
                customMail.send(function (err){
                    // if an error occurs
                    if(err) return console.log("failed to send email");
                    //on success
                    console.log("email sent ");
                });

                users[0].email = '';
                users[0].hashed_password = '';
                users[0].temp_password = '';
                users[0].token = '';
                users[0].salt = '';
                users[0].save();
                callback({'response':"Account deleted",'res':true,'token':id});
                //create new instance customEmail


            }else{

                callback({'response':"Password changed",'res':false});

            }
        }else {

            callback({'response':"User does not exist "+eml,'res':false});

        }
    });
}
