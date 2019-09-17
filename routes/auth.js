const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')

//signup
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
    const { email, password, userName, role } = req.body
    const profile = await Profile.create({})
    User.register(
      new User({
        email,
        userName,
        role,
        profile
      }),
      password
    )
    res.redirect('/login')
  } catch (errors) {
    console.log(errors)
    res.send('Tu usuario ya esta en uso')
  }
})

//login
router.get('/login', async (req, res, next) => {
  const config = {
    title: 'Inicia Sesión',
    action: '/login',
    button: 'Login'
  }
  await res.render('auth/form', config)
})
router.post(
  '/login',
  passport.authenticate('local'),
  async (req, res, next) => {
    await res.redirect('/profile')
  }
)
//PERFIL
router.get('/profile', checkAuthentication, async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('profile')
  if (req.user.role === 'TEACHER') {
    console.log(user)
    res.render('auth/profileTeacher', user)
  }
  res.render('auth/profile', user)
})
router.post('/profile/add', uploadCloud.single('photo'), async (req, res) => {
  const { url: img } = req.file
  const { profile: profileId } = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {
    img
  })
  res.redirect('/profile')
})
router.post('/profile/addSubject', async (req, res) => {
  const { subject } = req.body
  const { profile: profileId } = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profileId, {
    subject
  })
  res.redirect('/profile')
})
//Logout
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




module.exports = router

