/**
 * Created by Sohail on 11/7/15.
 */


//create a user and save it
//var user1 = new User(
//    { bank_id: 00000001, ssn: 955961866, name: "sohail baig" }
//);
//user1.save(function (err, userObj) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('saved successfully:', userObj);
//    }
//})



//register
//reg.register("sohailthebeast@gmail.com",00000001,955961866,"sohail baig",function (found) {
//    console.log(found);
//    //res.json(found);
//});

// login
//login.login("sohailthebeast@gmail.com","8qMvKz",function (found) {
//    console.log(found);
//    //res.json(found);
//});

// change pass
//chgpass.cpass("sohailthebeast@gmail.com","8qMvKz","lxe!X13",function (found) {
//    console.log(found);
//    //res.json(found);
//});

//change email
//chgemail.cemail("sohailthebeast+1@gmail.com","sohailthebeast@gmail.com","lxe!X13",function(found){
//    console.log(found);
//   // res.json(found);
//});

//remove user by id
//User.findOneAndRemove({_id: '563ec9034af23412b9552236'}, function(err){
//    console.log("removed");
//});

//display all users
User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
        userMap[user._id] = user;

    });

    return console.log(userMap);
});