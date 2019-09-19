const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')

router.get('/viewAllTeachers', async (req, res, next) => {
  const find = await User.find().populate('profile')
  const users = find.map(function(element) {
    if (element.role === 'TEACHER') {
      console.log('estos son los buenos', element)

      return element
    }
  })
  res.render('../views/auth/view-all-teachers', { users })
})

router.get('/viewAllSubjects', async (req, res, next) => {
  const find = await User.find().populate('profile')
  const users = find.map(function(element) {
    if (element.role === 'TEACHER') {
      console.log('estos son los buenos', element)
      return element
    }
  })

  const subjects = await Subject.find()
  console.log('los temassssss', subjects)
  res.render('../views/auth/view-all-subjects.hbs', { subjects })
})

router.get('/viewAllMeetings', async (req, res, next) => {
  const meetings = await Meeting.find()

  res.render('../views/auth/view-all-meetings', { meetings })
})

router.get('/viewAllGroups', async (req, res, next) => {
  const grupos = await StudyGroup.find()

  res.render('../views/auth/view-all-groups', { grupos })
})

module.exports = router
