const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

// template
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// method override
app.use(methodOverride('_method'))

// session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// flash message
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// mongoose 接続
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/video-app', {
  useNewUrlParser: true
})
.then(() => {
  console.log('mongoDB Connected...')
}).catch((err) => {
  console.log(err)
})

// routing
const index = require('./router/index.js')
const about = require('./router/about.js')
const ideas = require('./router/ideas.js')
const users = require('./router/users.js')
app.use('/', index)
app.use('/about/', about)
app.use('/ideas/', ideas)
app.use('/users/', users)

// server
const port = 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
