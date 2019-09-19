const { model, Schema } = require('mongoose')
const profileSchema = new Schema({
  name: String,
  img: {
    type: String,
    default:
      'https://www.flaticon.com/authors/freepik'
  },
  originalName: String,
  subject: [String]
  //enum: ['Fisica','Matematicas','Programacion','Literatura','Quimica','Biologia','Marketing','Astronomia'],
})
module.exports = model('Profile', profileSchema)
