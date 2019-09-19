const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')


router.get('/editProfile', async (req, res, next) => {
  const grupos = await StudyGroup.find()
  const meetings = await Meeting.find()
  const subjects = await Subject.find()
  console.log('allgroupssssssssss', meetings)
  res.render('auth/editProfile', {
    grupos,
    meetings,
    subjects
  })
})

router.post('/editgroup', uploadCloud.single('photo'), async (req, res, next) => {


  res.render('auth/editProfile')
})
//EDIT GROUPS
router.get('/:id/editOne', async (req, res, next) => {
  const {
    id
  } = req.params

  const grupos = await StudyGroup.findById(id)
  console.log('subjectsssssss', grupos)
  
  res.render('../views/auth/editOne', {grupos})


})

router.post('/:id/editOne',uploadCloud.single('photo'), async (req,res,next) =>{
  const { url: img } = req.file
  const {name, themes, difficulty} = req.body
await StudyGroup.findByIdAndUpdate(req.params.id, {name, themes, difficulty, img})

  res.redirect('/editProfile')
})

//EDIT MEETINGS

router.get('/:id/editOneMeeting', async (req, res, next) => {
  const {
    id
  } = req.params

  const meetings = await Meeting.findById(id)
  console.log('meetingsss', meetings)
  
  res.render('../views/auth/editOneMeeting', {meetings})


})

router.post('/:id/editOneMeeting',uploadCloud.single('photo'), async (req,res,next) =>{
  const { url: img } = req.file
  const {name, teacher, address} = req.body
  console.log('elnameeee', name)
await Meeting.findByIdAndUpdate(req.params.id, {name, teacher, address, img})

  res.redirect('/editProfile')
})



//EDIT SUBJECTS


router.get('/:id/editOneSubject', async (req, res, next) => {
  const {
    id
  } = req.params

  const subjects = await Subject.findById(id)
  console.log('subjectsss', subjects)
  
  res.render('../views/auth/editOneSubject', {subjects})


})

router.post('/:id/editOneSubject',uploadCloud.single('photo'), async (req,res,next) =>{
  const { url: img } = req.file
  const {name, themes, difficulty} = req.body
  console.log('elnameeee', name)
await Subject.findByIdAndUpdate(req.params.id, {name, themes, difficulty, img})

  res.redirect('/editProfile')
})

//DELETE GROUPS
router.get('/:id/deleteOne', async (req, res, next) => {
  const {
    id
  } = req.params

  await StudyGroup.findByIdAndDelete(id)
  console.log('subjectsssssss')
  
  res.redirect('../editProfile')


})

router.get('/:id/deleteOneMeeting', async (req, res, next) => {
  const {
    id
  } = req.params

  await Meeting.findByIdAndDelete(id)
  console.log('subjectsssssss')
  
  res.redirect('../editProfile')


})

router.get('/:id/deleteOneSubject', async (req, res, next) => {
  const {
    id
  } = req.params

  await Subject.findByIdAndDelete(id)
  console.log('subjectsssssss')
  
  res.redirect('../editProfile')


})


module.exports = router