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

// api end point to handle a new user registering
UserRouter.route('/editUser')
    .post(function(req, res) {
        User.findOne({}, function(err, usr){
            if (err) return res.send(500, {error: err});
            let oldPassword = req.body.oldPassword;
            usr.comparePassword(oldPassword, function(err, isMatch){
                if (err) throw err;
                if (isMatch){
                    usr.name=req.body.name;
                    usr.email=req.body.email;
                    usr.password=req.body.password;
                    usr.save();
                    return res.send('Succesfully updated user info.');
                } else {
                    res.status(400).json({ message: 'Old Password is wrong' });
                };


            });  
        })
});    


function authenticate(req, res, next) {
	User.findOne({email : req.body.email}, function(err, user){
        if (err) throw err;
        user.comparePassword(req.body.password, function(err, isMatch){
            if (err) throw err;
            if (isMatch && user.email===req.body.email){
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
UserRouter.get('/getUser', getUser); // admin only

module.exports = UserRouter;