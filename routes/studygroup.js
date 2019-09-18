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

router.post('/creategroup',uploadCloud.single('photo'),  async (req, res, next) => {
  const { url: img } = req.file
  const { name, themes, difficulty } = req.body
  await StudyGroup.create({ name, themes, difficulty, img })
  res.render('auth/group', {name, themes, difficulty, img})
})


module.exports = router