const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { ensureAuthenticated } = require('../helpers/auth.js')

// mongoose schema作成
require('../models/Ideas.js')
const Idea = mongoose.model('ideas')

// get '/ideas/'
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then( ideas => {
      res.render('ideas/index', { ideas })
    })
})
// post '/ideas/'
router.post('/', ensureAuthenticated, (req, res) => {
  // validation
  let errors = []
  if ( !req.body.title ) {
    errors.push({ text: 'please add a title' })
  }
  if ( !req.body.details ) {
    errors.push({ text: 'please add some details' })
  }

  // エラー時
  if ( errors.length > 0 ) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    })
  }
  // 正常
  else {
    // mongodbに保存
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then( idea => {
        req.flash('success_msg', 'Video idea added')
        res.redirect('/ideas')
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

// get '/ideas/add/' 入力画面
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add')
})

// get '/ideas/edit/:id' 個別再編集画面
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then( idea => {
    res.render('ideas/edit', { idea })
  })
})

// put '/ideas/id' 再編集後 mongodb再書き込み
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then( idea => {
    // mongodb 再書き込み
    idea.title = req.body.title
    idea.details = req.body.details

    idea.save()
      .then( idea => {
        req.flash('success_msg', 'Video idea updated')
        res.redirect('/ideas/')
      })
  })
})

// delete '/ideas/id'
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.deleteOne({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Video idea removed')
      res.redirect('/ideas/')
    })
})

module.exports = router
