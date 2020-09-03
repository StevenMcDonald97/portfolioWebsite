const config = require('../config.json');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    authenticate,
    getUser
};

async function authenticate(userInfo) {
    User.findOne({email : userInfo.email}, function(err, user){
        if (err) throw err;
        user.comparePassword(userInfo.password, function(err, isMatch){
            if (err) throw err;
            if (isMatch){
                const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                const { password, ...userWithoutPassword } = user;
                return {
                    ...userWithoutPassword,
                    token
                };    
            } else {
                return {}
            }

        });        
    });
}

async function getUser() {
    return User.findOne().exec();
}
