const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const router = express.Router()

require('../models/Users.js')
const User = mongoose.model('users')

// login
router.get('/login/', (req, res) => {
  res.render('users/login')
})

// register
router.get('/register/', (req, res) => {
  res.render('users/register')
})

router.post('/register/', (req, res) => {
  let errors = []

  // password validation
  if (req.body.password !== req.body.password2 ) {
    errors.push({ text: 'passwords do not match' })
  }
  if(req.body.password.length < 4) {
    errors.push({ text: 'passowrd must be at least 4 chars' })
  }

  if(errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else {
    // emailがすでに登録されていないか
    User.findOne({email: req.body.email})
      .then( user => {
        if (user) {
          req.flash('error_msg', 'Email already registered')
          res.redirect('/users/register/')
        } else {
          const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
          bcrypt.genSalt(10, ( err, salt ) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw errors
              newUser.password = hash
              newUser.save()
                .then( user => {
                  req.flash('succes_msg', 'you are registered')
                  res.redirect('/users/login')
                })
                .catch((err) => {
                  req.flash('error_msg', 'sorry, something wrong, try again')
                })
            })
          })
        }
      })
  }
})

module.exports = router
