/**
 * Created by Sohail on 10/24/15.
 */
var chgpass = require('../config/chgpass');
var chgemail = require('../config/chgemail');
var register = require('../config/register');
var login = require('../config/login');


module.exports = function(app) {



    app.get('/', function(req, res) {

        res.end("Node-api");
    });

    //register
    app.post('/account/create',function(req,res){
        var email1 = req.body.email;
        var ssn1 = req.body.ssn;
        var bank_id1 = req.body.bank_id;
        var name1 = req.body.name;

        register.register(email1,bank_id1,ssn1,name1,function (found) {
            console.log(found);
            res.json(found);
        });
    });


    //change password
    app.post('/account/password', function(req, res) {
        var email2 = req.body.email;
        var opass2 = req.body.opass;
        var npass2 = req.body.newpass;

        chgpass.cpass(email2,opass2,npass2,function(found){
            console.log(found);
            res.json(found);
        });
    });


    //change email
    app.post('/account/email', function(req, res) {
        var email_old = req.body.email_o;
        var email_new = req.body.email_n;
        var pass = req.body.pass;

        chgemail.cemail(email_old,email_new,pass,function(found){
            console.log(found);
            res.json(found);
        });
    });


};



