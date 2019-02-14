const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

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
    res.send('pass')
  }

})

module.exports = router
