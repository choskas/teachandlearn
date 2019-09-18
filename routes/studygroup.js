const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')


router.get('/newgroup', async(req, res, next) => {
  
  res.render('auth/create-group')
})

router.post('/creategroup', async (req, res, next) => {
  const { name, themes, difficulty } = req.body
  await StudyGroup.create({ name, themes, difficulty })
  res.render('auth/group', {name, themes, difficulty})
})


module.exports = router