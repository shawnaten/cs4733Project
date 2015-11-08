var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var user = require('../config/models');
var appName = "Node.js bank";
var CustomMail = require('../config/emailAdapter');
exports.cpass = function(email,opass,npass,callback) {

    var temp1 =rand(160, 36);
    var newpass1 = temp1 + npass;
    var hashed_passwordn = crypto.createHash('sha512').update(newpass1).digest("hex");
    if (opass == npass){
        callback({'response':"password must be different from previous password",'res':false});
        process.exit(100)

    }
    user.find({email: email},function(err,users){

        if(users.length != 0){

            var temp = users[0].salt;
            var hash_db = users[0].hashed_password;
            var newpass = temp + opass;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");


            if(hash_db == hashed_password){

                if (npass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && npass.length > 4 && npass.match(/[0-9]/) && npass.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {

                    user.findOne({ email: email }, function (err, doc){
                        doc.hashed_password = hashed_passwordn;
                        doc.salt = temp1;
                        doc.save();
                        callback({'response':"Password Sucessfully Changed",'res':true});
                        //create new instance customEmail
                        var customMail = new CustomMail(email, appName+ ': Account Alert', 'newpass', doc);
                        customMail.send(function (err){
                            // if an error occurs
                            if(err) return console.log("failed to send email");
                            //on success
                            console.log("email sent ");
                        });

                    });
                }else{

                    callback({'response':"Password must include a special character, uppercase letter, " +
                                         "lowercase letter ,number, and longer than 4 characters.",'res':false});

                }
            }else{

                callback({'response':"Passwords do not match. Try Again !",'res':false});

            }
        }else{

            callback({'response':"Error while changing password",'res':false});

        }

    });
}


