/**
 * Created by Sohail on 11/2/15.
 */
var pin = require('../config/pinGenerator');

module.exports = {
    user: {
        firstName: "Sohail",
        lastName: "Baig",
        email: "bsohail99@yahoo.com",
        verificationCode: pin.pinGenerator,
        message: "Yo your password",
        appName: 'nodejs.Bank'
    }
};


