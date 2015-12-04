/**
 * Created by Sohail on 12/3/15.
 */
var APIUser = require('../modules/APIUser');
var express = require('express');
var router = express.Router();
var jsonRes = require('../modules/jsonRes');
var BankUser = require('../modules/BankUser');
var Message = require('../modules/Message');

//Send Message
router.get(/send\/.+/, function(req, res, next) {
    var Email = req.path.match(/email\/(.+)/)[1];
    var pass = req.query.password;
    var to = req.query.to;
    var title = req.query.title;
    var content = req.query.content;

    APIUser.findByEmail(Email, pass, findCB);

    function findCB(user) {
        if (!user) {
            console.log('/message/sendmessage: Invalid login credentials.');
            res.send(jsonRes.loginInvalid);
        }
        else {
            var id =  user.id;
            Message.createMessage(to,id,title,content, checkMessage );
            function checkMessage (messageObj) {
                if (!messageObj) {
                    console.log('/message/send: Invalid message.');
                    res.send(jsonRes.undef);
                }
                else {
                    res.send(jsonRes.okay);
                }
            }
        }
    }
});

// Get Inbox
router.get(/inbox\/.+/, function(req, res, next) {
    var Email = req.path.match(/email\/(.+)/)[1];
    var pass = req.query.password;
    APIUser.findByEmail(Email, pass, findCB);

    function findCB(user) {
        if (!user) {
            console.log('/message/inbox: Invalid login credentials.');
            res.send(jsonRes.loginInvalid);
        }
        else {
          var id =  user.id;
          Message.inbox_findById(id);
        }
    }
});

// Get Outbox
router.get(/outbox\/.+/, function(req, res, next) {
    var Email = req.path.match(/email\/(.+)/)[1];
    var pass = req.query.password;
    APIUser.findByEmail(Email, pass, findCB);

    function findCB(user) {
        if (!user) {
            console.log('/message/outbox: Invalid login credentials.');
            res.send(jsonRes.loginInvalid);
        }
        else {
            var id =  user.id;
            Message.outbox_findById(id);
        }
    }
});

// Get Trashbox
router.get(/trashbox\/.+/, function(req, res, next) {
    var Email = req.path.match(/email\/(.+)/)[1];
    var pass = req.query.password;

    APIUser.findByEmail(Email, pass, findCB);

    function findCB(user) {
        if (!user) {
            console.log('/message/trashbox: Invalid login credentials.');
            res.send(jsonRes.loginInvalid);
        }
        else {
            var id =  user.id;
            Message.trash_findById(id);

        }
    }
});

// mark as Trash
router.get(/markasTrash\/.+/, function(req, res, next) {
    var Email = req.path.match(/email\/(.+)/)[1];
    var pass = req.query.password;
    var _id = req.query._id;

    APIUser.findByEmail(Email, pass, findCB);

    function findCB(user) {
        if (!user) {
            console.log('/message/markasTrash: invalid login credentials.');
            res.send(jsonRes.loginInvalid);
        }
        else {
            var uid = user.id;
            Message.getMessage(_id,findCB);
            function findCB(doc){
                if (!doc) {
                    console.log('/message/markasTrash: Invalid message.');
                    res.send(jsonRes.undef);
                }
                else {
                    if (doc.from == uid){
                        doc.from_trash = true;
                        doc.save(function (err, userObj) {
                                if (err) {
                                    console.log(err);
                                    res.send(jsonRes.undef);
                                } else {
                                    console.log('saved successfully:', userObj);
                                    res.send(jsonRes.okay);
                                }
                            });
                    }
                    else if (doc.to == uid){
                        doc.to_trash = true;
                        doc.save(function (err, userObj) {
                                if (err) {
                                    console.log(err);
                                    res.send(jsonRes.undef);
                                } else {
                                    console.log('saved successfully:', userObj);
                                    res.send(jsonRes.okay);
                                }
                            });
                    }
                    else{
                        console.log('/message/markasTrash: message is not associated with user.');
                        res.send(jsonRes.undef);
                    }

                }
            }

        }
    }
});