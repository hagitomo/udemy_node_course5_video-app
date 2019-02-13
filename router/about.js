const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('about')
})

module.exports = router
