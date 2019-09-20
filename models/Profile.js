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
  })
module.exports = model('Profile', profileSchema)
