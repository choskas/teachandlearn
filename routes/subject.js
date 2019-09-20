const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/subject', isLoggedIn('/login'), (req, res, next) => {
  res.render('auth/create-subject', {login: true})
})

router.post(
  '/createsubject',
  uploadCloud.single('photo'),
  async (req, res, next) => {
    const { url: img } = req.file
    const { name, themes, difficulty } = req.body
    const { _id: owner } = req.user

  

    await Subject.create({ name, themes, difficulty, img, owner })
    res.redirect('/news')
  }
)

router.get('/news', isLoggedIn('/login'), async (req, res, next) => {
  const find = await User.find()
    .populate('profile')
    .limit(5)
  const users = find.map(function(element) {
    if (element.role === 'TEACHER') {

      return element
    }
  })

  const grupos = await StudyGroup.find().limit(5)
  const meetings = await Meeting.find().limit(5)
  const subjects = await Subject.find().limit(5)
  res.render('../views/auth/news', { subjects, users, meetings, grupos, login: true })
})

module.exports = router
