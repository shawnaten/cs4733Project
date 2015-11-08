/**
 * Created by Sohail on 11/2/15.
 * This class uses the adapter pattern
 * to connect the nodemailer api to the server
 */
//lib imports
var fs = require('fs');
var ejs = require('ejs');
//class imports
var nodemailer = require('nodemailer');
var models = require('../config/temp_models');
var bankingEmail = require('../config/bankingEmail')


// email components model
var CustomMail = function (to, subject, template, content){
    this.to = to;
    this.subject = subject;
    this.template = template;
    this.content = content;
};

//template input
ejs.open = '{{';
ejs.close = '}}';

// login
var transporter = nodemailer.createTransport("SMTP",{
    auth: {
        user: bankingEmail.banking.email,
        pass: bankingEmail.banking.key
    }
});

CustomMail.prototype.send = function (callback){
    //Get email template path
    var template = process.cwd() + '/templates/' +this.template+'.ejs';
    var content = this.content;
    var to = this.to;
    var subject = this.subject;

    // Use fileSystem module to read template file
    fs.readFile(template, 'utf8', function (err, file){
        if(err) return callback (err);

        //adds the components to template
        var html = ejs.render(file, content);

        //implements the components model
        var mailOptions = {
            from: "nodejs.Bank  <Banking@gmail.com>",
            to: to,
            subject: subject,
            html: html
        };
        //sends the email after logging in
        transporter.sendMail(mailOptions, function (err, info){
            // If a problem occurs, return callback with the error
            if(err) return callback(err);
            console.log(info);
            callback();
        });
    });
};

//export custom module
module.exports = CustomMail;