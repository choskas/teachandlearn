module.exports = route => (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = member
    next()
  } else {
    res.redirect(route)
  }
}
