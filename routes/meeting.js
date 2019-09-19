const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const Profile = require('../models/Profile')
const uploadCloud = require('../config/cloudinary')
const Subject = require('../models/Subject')
const StudyGroup = require('../models/StudyGroup')
const Meeting = require('../models/Meeting')
const isLoggedIn = require('../middlewares/isLoggedIn')
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
    const { _id: owner } = req.user
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
      group,
      owner
    })
    res.redirect('/news')
  }
)
router.get('/newmeeting', isLoggedIn('/login'), (req, res, next) => {
  res.render('../views/auth/create-meeting')
})
router.post('/:id/meetingregister', async (req, res, next) => {
  const { id } = req.params
  const { userName, picPath, email, role } = await User.findById(req.user.id)
  const allUser = await User.findById(req.user.id)
  const meeting = await Meeting.findByIdAndUpdate(id, {
    $push: { assistants: allUser }
  })
  const mapa = await Meeting.findById(id)

  console.log('el nombre de la reunioooon', mapa.location.coordinates[1])
  console.log('el array', meeting.assistants)
  console.log('las cosas del usuarioooo', allUser)
  res.render('../views/auth/meeting-register', {
    userName,
    picPath,
    email,
    role,
    id,
    mapa,
    meeting
  })
})
router.post('/newregister', async (req, res, next) => {
  res.redirect('/viewAllMeetings')
})

module.exports = router
