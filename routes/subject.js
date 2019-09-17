const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')


router.get('/subject', (req, res, next) => {
  res.render('auth/create-subject')
})

router.post('/createsubject', async (req, res, next) => {
  
  const { name, themes, difficulty} = req.body
  
  console.log('cosas creadasssssssss', name, themes, difficulty)

  await Subject.create({ name, themes, difficulty })
  res.redirect('/news')
})

// console.log('cosas creadasssssssss', name, themes, difficulty)
//   const { id: profileId } = await User.findById(req.user)
//   console.log('el iddddddd', profileId)
//   await Subject.create(profileId, {
//     name, themes, difficulty
//   })

router.get('/newgroup', (req, res, next) => {
  res.render('auth/create-group')
})

router.post('/creategroup', async (req, res, next) => {
  const { name, themes, difficulty } = req.body
  await StudyGroup.create({ name, themes, difficulty })
  res.redirect('/group')
})

router.get('/news', async (req, res, next) => {
  const user = await User.find()
  console.log('<<<<<<<<<<<<<<<<<<<<<', user[0].role)
  if (user.role === 'TEACHER') {
  
    res.render('../views/auth/news', user.username)
  }
  const subjects = await Subject.find()
  res.render('../views/auth/news', {subjects})
})

router.get('/test', (req, res, next) => {
  res.render('../views/auth/subjects')
})





module.exports = router