const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')


router.get('/subject', (req, res, next) => {
  res.render('auth/create-subject')
})

router.post('/createsubject', async (req, res, next) => {
  
  const { name, themes, difficulty} = req.body
  
  console.log('cosas creadasssssssss', name, themes, difficulty)

  await Subject.create({ name, themes, difficulty })
  res.redirect('/news')
})

router.get('/newgroup', (req, res, next) => {
  res.render('auth/create-group')
})

router.post('/creategroup', async (req, res, next) => {
  const { name, themes, difficulty } = req.body
  await StudyGroup.create({ name, themes, difficulty })
  res.redirect('/group')
})

router.get('/news', async (req, res, next) => {
  const find = await User.find()
  const users = find.map(function(element) {
        if(element.role === 'TEACHER'){
      console.log('estos son los buenos', element)
      return element
    }
  })
  const meetings = await Meeting.find()
  const subjects = await Subject.find()
  res.render('../views/auth/news', {subjects, users, meetings})
})


module.exports = router