const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// load user model
require('../models/Users.js')
const User = mongoose.model('users')

module.exports = function( passport ) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
  }, (email, password, done) => {
    // ユーザ照合
    User.findOne({
      email: email
    }).then(user => {
      // ユーザーが存在しない
      if( !user ) {
        return done(null, false, { message: 'no user found' })
      }

      // パスワードと照合
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if ( isMatch ) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'password incorrect'})
        }
      })
    })
  }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
