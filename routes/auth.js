const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')

router.get('/signup', (req, res, next) => {
  const config = {
    title: 'Registrate',
    action: '/signup',
    button: 'Sign up',
    register: true
  }
  res.render('auth/form', config)
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body }, req.body.password)
    console.log(user)
    res.redirect('/login')
    console.log(user)
  } catch (errors) {
    console.log(errors)
    res.send('Tu usuario ya esta en uso')
  }
})

router.get('/login', (req, res, next) => {
  const config = {
    title: 'Inicia Sesión',
    action: '/login',
    button: 'Login'
  }
  res.render('auth/form', config)
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/profile')
})

router.get('/profile', checkAuthentication, (req, res, next) => {
  if (req.user.role === 'TEACHER') {
    res.render('auth/profileTeacher', { user: req.userName })
  }
  res.render('auth/profile', { user: req.userName })
})

router.post('/profile', uploadCloud.single('photo'), async (req, res) => {
  let { content } = req.body
  let picName = req.file.originalname
  let picPath = req.file.url
  await Profile.create({ content, picName, picPath })
  res.redirect('/profile')
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/subject', (req, res, next) => {
  res.render('auth/create-subject')
})

router.post('/createsubject', async (req, res, next) => {
  const { name, themes, difficulty } = req.body
  await Subject.create({ name, themes, difficulty })
  res.redirect('/news')
})

router.get('/news', (req, res, next) => {
  res.render('../views/auth/news')
})

module.exports = router
