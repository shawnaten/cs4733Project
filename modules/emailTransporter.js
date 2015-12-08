// Config information for email client.

var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "utsa.cs.4733.restful.node@gmail.com",
    pass: process.env.EMAIL_PASS
  }
});
