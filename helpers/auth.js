const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error_msg', 'Not authorized')
  res.redirect('/users/login/')
}

module.exports = {
  ensureAuthenticated
}
