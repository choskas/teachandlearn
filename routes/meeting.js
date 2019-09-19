const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')

router.post(
  '/createmeeting',
  uploadCloud.single('img'),
  async (req, res, next) => {
    const { url: img } = req.file
    const {
      name,
      teacher,
      date,
      address,
      lat,
      lng,
      description,
      group
    } = req.body
    await Meeting.create({
      name,
      teacher,
      date,
      location: {
        address,
        coordinates: [lat, lng]
      },
      description,
      img,
      group
    })

    res.redirect('/news')
  }
)

router.get('/newmeeting', (req, res, next) => {
  res.render('../views/auth/create-meeting')
})

router.post('/:id/meetingregister', async (req, res, next) => {
  const { id } = req.params

  const { userName, picPath, email, role } = await User.findById(req.user.id)
  const allUser = await User.findById(req.user.id)

  const meeting = await Meeting.findByIdAndUpdate(id, {
    $push: { assistants: allUser }
  })

  console.log('el nombre de la reunioooon', meeting.name)
  console.log('el array', meeting.assistants)
  console.log('las cosas del usuarioooo', allUser)
  res.render('../views/auth/meeting-register', {
    userName,
    picPath,
    email,
    role,
    id
  })
})

router.post('/newregister', async (req, res, next) => {
  res.redirect('/viewAllMeetings')
})

// user = User.findById(req.user.id)
//   console.log('el userrrrr', user.userName)
//   let registrado = user.register === true
//   console.log('esta registradooooo', registrado)

module.exports = router
