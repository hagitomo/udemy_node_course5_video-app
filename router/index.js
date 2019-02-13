const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const router = express.Router()

router.get('/', (req, res) => {
  const title = 'index'
  res.render('index', {
    title: title
  })
})

module.exports = router
