const express = require('express');
const EmailRouter = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const creds = require('./emailConfig');
var password = "monetTurnerSargent"
var email="myArtistWebsiteMailer@gmail.com"
require("@babel/polyfill");

var transport = {
    service: 'gmail', 
    port: 587,
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
}

var transporter = nodemailer.createTransport(transport)
  
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

EmailRouter.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `${name} at: ${email} sent you the message: \n ${message} `

  User.findOne({}).exec(function(err, user) {
    var mail = {
      from: name,
      to: user.email,  // Change to email address that you want to receive messages on
      subject: 'A client messaged you',
      text: content
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        });
      }
    });
  });
});
module.exports = EmailRouter;
