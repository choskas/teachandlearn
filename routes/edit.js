const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')
const isLoggedIn = require('../middlewares/isLoggedIn')
const checkRole = require('../middlewares/checkRole')


router.get('/editProfile', isLoggedIn('/login'), checkRole('TEACHER'), async (req, res, next) => {
  const {
    user
  } = req
  const usr = req.user
  const grupos = await StudyGroup.find()
  const meetings = await Meeting.find({owner: user._id})
  const subjects = await Subject.find({
    owner: user._id
  })
  res.render('auth/editProfile', { usr,
    grupos,
    meetings,
    subjects,
    login: true
  })
})

router.post(
  '/editgroup',
  uploadCloud.single('photo'),
  async (req, res, next) => {
    res.render('auth/editProfile')
  }
)
//EDIT GROUPS
router.get('/:id/editOne',isLoggedIn('/login'), checkRole('TEACHER'), async (req, res, next) => {
  const {
    id
  } = req.params
  const usr = req.user
  const grupos = await StudyGroup.findById(id)
 

  res.render('../views/auth/editOne', {
    grupos, login: true
  })


  res.render('../views/auth/editOne', { grupos, usr })
})

router.post('/:id/editOne', uploadCloud.single('photo'), async (req, res, next) => {
  const {
    url: img
  } = req.file
  const {
    name,
    themes,
    difficulty
  } = req.body
  await StudyGroup.findByIdAndUpdate(req.params.id, {
    name,
    themes,
    difficulty,
    img
  })

  res.redirect('/editProfile')
})

//EDIT MEETINGS

router.get('/:id/editOneMeeting',isLoggedIn('/login'),checkRole('TEACHER'), async (req, res, next) => {
  const {
    id
  } = req.params
const usr = req.user
  const meetings = await Meeting.findById(id)


  res.render('../views/auth/editOneMeeting', {
    meetings
  })


  res.render('../views/auth/editOneMeeting', { meetings, usr, login: true })
})

router.post('/:id/editOneMeeting', uploadCloud.single('photo'), async (req, res, next) => {
  const {
    url: img
  } = req.file
  const {
    name,
    teacher,
    address
  } = req.body
  
  await Meeting.findByIdAndUpdate(req.params.id, {
    name,
    teacher,
    address,
    img
  })

  res.redirect('/editProfile')
})



//EDIT SUBJECTS


router.get('/:id/editOneSubject',isLoggedIn('/login'),checkRole('TEACHER'), async (req, res, next) => {
  const {
    id
  } = req.params
  const usr = req.user
  const subjects = await Subject.findById(id)
 

  res.render('../views/auth/editOneSubject', {
    subjects
  })


  res.render('../views/auth/editOneSubject', { subjects, usr })
})

router.post('/:id/editOneSubject', uploadCloud.single('photo'), async (req, res, next) => {
  const {
    url: img
  } = req.file
  const {
    name,
    themes,
    difficulty
  } = req.body
 
  await Subject.findByIdAndUpdate(req.params.id, {
    name,
    themes,
    difficulty,
    img
  })

  res.redirect('/editProfile')
})

//DELETE GROUPS
router.get('/:id/deleteOne',isLoggedIn('/login'),checkRole('TEACHER'), async (req, res, next) => {
  const {
    id
  } = req.params
const usr = req.user
  await StudyGroup.findByIdAndDelete(id)
  

  res.redirect('../editProfile',usr)


  res.redirect('../editProfile',usr)
})

router.get('/:id/deleteOneMeeting',isLoggedIn('/login'),checkRole('TEACHER'), async (req, res, next) => {
  const {
    id
  } = req.params
const usr = req.user
  await Meeting.findByIdAndDelete(id)


  res.redirect('../editProfile',{usr})


  res.redirect('../editProfile', {usr})
})

router.get('/:id/deleteOneSubject',isLoggedIn('/login'),checkRole('TEACHER'), async (req, res, next) => {
  const {
    id
  } = req.params
  const usr = req.user
  await Subject.findByIdAndDelete(id)
 

  res.redirect('../editProfile', {usr})


  res.redirect('../editProfile', {usr})
})


module.exports = router
