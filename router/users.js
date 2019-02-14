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
module.exports = router
