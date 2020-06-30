const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const withAuth = require('../middleware/withAuth');
const UserRouter = express.Router();
const secret = 'asecretphrase';

// api end point to handle a new user registering
UserRouter.route('/register')
	.post(function(req, res) {
	  const { name, email, password } = req.body;
	  const user = new User({ name, email, password });
	  user.save(function(err) {
	    if (err) {
	      console.error(err);
	      res.status(500).send("Error registering new user please try again.");
	    } else {
	      res.status(200).send("Welcome to the club!");
	    }
	  });
});

// api endpoint to handle authenticaating user loging in
UserRouter.route('/authenticate')
	.post(function(req, res) {
	  const { email, password } = req.body;
	  User.findOne({ email }, function(err, user) {
	    if (err) {
	      console.error(err);
	      res.status(500)
	        .json({
	        error: 'Internal error please try again'
	      });
	    } else if (!user) {
	      res.status(401)
	        .json({
	        error: 'Incorrect email or password'
	      });
	    } else {

	      user.isCorrectPassword(password, function(err, same) {
	        if (err) {
	          res.status(500)
	            .json({
	            error: 'Internal error please try again'
	          });
	        } else if (!same) {
	          res.status(401)
	            .json({
	            error: 'Incorrect email or password'
	          });
	        } else {
	          // Issue token
	          const payload = { email };
	          const token = jwt.sign(payload, secret, {
	            expiresIn: '1h'
	          });
	          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
	        }
	      });
	    }
  });
});

// check if the user has a valid token
UserRouter.route('/checkToken').get(withAuth, function(req,res){
  res.sendStatus(200);
})

module.exports = UserRouter;
