const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/newgroup',isLoggedIn('/login'), async(req, res, next) => {
  
  res.render('auth/create-group', {login: true})
})

router.post('/creategroup',uploadCloud.single('photo'),  async (req, res, next) => {
  const { url: img } = req.file
  const { name, themes, difficulty } = req.body
  await StudyGroup.create({ name, themes, difficulty, img })
  res.render('auth/group', {name, themes, difficulty, img})
})


router.post('/:id/groupregister', async(req,res,next) => {
  const {id} = req.params
  

 
  
  const {userName, picPath, email, role} = await User.findById(req.user.id)
  const allUser = await User.findById(req.user.id)
  
  const group = await StudyGroup.findByIdAndUpdate(id, {$push:{'assistants': allUser}})
  
 
  console.log('el nombre de la reunioooon', group.name)
  console.log('el array', group.assistants[0].userName)
  console.log('las cosas del usuarioooo', allUser)
 res.render('../views/auth/group-register', {userName, picPath, email, role, id, group})
  
})

router.post('/newgroupregister', async(req,res,next)=>{
  
  
  
  

  res.redirect('/viewAllGroups')
})

module.exports = router