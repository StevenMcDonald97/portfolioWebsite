const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config.json');
const UserRouter = express.Router();

// const userService = require('../controller/userService');



// api end point to handle a new user registering
UserRouter.route('/createUser')
	.post(function(req, res) {
		User.countDocuments(function (err, count) {
		    if (!err && count === 0) {
		        const { confirm, ...userInfo } = req.body;
				const user = new User({ ...userInfo });
				user.save(function(err_2) {
					if (err_2) {
					  console.error(err_2);
					  res.status(500).send("Error registering new user please try again.");
					} else {
					  res.status(200).send("Welcome! Your profile is set up");
					}
				});
		    } else if (count>0) {
				res.status(500).send("An account has already been created on this domain.");
		    } else {
				res.status(500).send("Error registering new user please try again.");
		    }
		}); 	  
});

function authenticate(req, res, next) {
	console.log("1");

	User.findOne({email : req.body.email}, function(err, user){
        if (err) throw err;
        user.comparePassword(req.body.password, function(err, isMatch){
            if (err) throw err;
            if (isMatch){
                const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                const { password, ...userWithoutPassword } = user;
                res.json({
                    ...userWithoutPassword,
                    token
                });    
            } else {
    			res.status(400).json({ message: 'Incorrect login info' });
            };


        });        
    })
	.catch(err => {next(err)});
    // userService.authenticate(req.body)
    //     .then(user =>{
    //     	console.log("user is: "+user);
    //     	if (user.token) {
    //     		res.json(user);
    //     	} else {
    //     		res.status(400).json({ message: 'Incorrect login info' });
    //     	}
    //     })
    //     .catch(err => next(err));
}

function getUser(req, res, next) {
    User.findOne().exec()
        .then(user => res.json(user))
        .catch(err => next(err));

}

// routes
UserRouter.post('/authenticate', authenticate); // public route
UserRouter.get('/', getUser); // admin only

module.exports = UserRouter;