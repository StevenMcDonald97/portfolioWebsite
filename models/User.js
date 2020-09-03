// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// UserSchema.pre('save', function(next) {
//   // Check if document is new or a new password has been set
//   if (this.isNew || this.isModified('password')) {
//     // Saving reference to this because of changing scopes
//     const document = this;
//     bcrypt.hash(document.password, saltRounds,
//       function(err, hashedPassword) {
//       if (err) {
//         next(err);
//       }
//       else {
//         document.password = hashedPassword;
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

UserSchema.pre('save', function(next){
  let user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return ext(err);
      user.password = hash;
      next();
    })
  })

})


UserSchema.methods.getFullName = function() {
  return this.name;
}

UserSchema.methods.comparePassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err,isSame){
    if(err) return callback(err);
    callback(err, isSame);

  });
}

module.exports = mongoose.model('User', UserSchema);
