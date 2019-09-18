const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')


router.post('/createmeeting',uploadCloud.single('photo'), async (req, res, next) => {
  const { url: img } = req.file
  const {
    name,
    teacher,
    date,
    location,
    address,
    coordinates,
    description,
    group
  } = req.body
  await Meeting.create({
    name,
    teacher,
    date,
    location,
    address,
    coordinates,
    description,
    img,
    group
  })
  
  
  
  
  res.redirect('/news')
})

router.get('/newmeeting', (req, res, next) => {
  res.render('../views/auth/create-meeting')
})


module.exports = router