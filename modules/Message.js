/**
 * Created by Sohail on 12/3/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bankUser = require('../modules/BankUser');

var messageSchema = new Schema({
        to : Number,
        from : Number,
        title : String,
        content : String,
        created : {type: Date, default: Date.now},
        from_trash : {type: Boolean, default: false},
        to_trash : {type: Boolean, default: false}
    });

var conn = mongoose.createConnection('mongodb://db/message');
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {});

var model = conn.model('Message', messageSchema);

//create message
model.createMessage = function (toN,fromN,titleN,contentN, callback){

    bankUser.findByName(toN, createMessage);
    function createMessage(to) {
        //create a message and save it
        var messageNew = new model(
            { to: to, from: fromN, title: titleN, content: contentN }
        );
        messageNew.save(function (err, messageObj) {
            if (err) {
                callback(err);
                console.log(err);
            } else {
                console.log('saved successfully:', messageObj);
                callback(messageObj);
            }
        });
    }
};

//inbox
model.inbox_findById = function (id, callback) {

    model.find({to: id, to_trash: false}).sort({created: -1}).exec(
        function(err, docs) {
            if (err || !result)
                callback(null);
            else
                callback(docs);
        });

};

//outbox
model.outbox_findById = function (id, callback) {

    model.find({from: id,  from_trash: false}).sort({created: -1}).exec(
        function(err, docs) {
            if (err || !result)
                callback(null);
            else
                callback(docs);
        });

};

//trashbox
model.trash_findById = function (id, callback) {

    model.find({ $or:[{from: id,from_trash: true},{ to: id,to_trash: true}]}).sort({created: -1}).exec(
        function(err, docs) {
            if (err || !result)
                callback(null);
            else
                callback(docs);
        });

};

//get message
model.getMessage = function (id, callback){
    model.findOne({ _id:id}).exec(
        function(err, doc) {
            if (err || !result)
                callback(null);
            else
                callback(doc);
        });

};
module.exports = model;
