const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// template
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')


// routing
app.get('/', (req, res) => {
  const title = 'index'
  res.render('index', {
    title: title
  })
})
app.get('/about', (req, res) => {
  res.render('about')
})


const port = 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
