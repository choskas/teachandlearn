const { model, Schema } = require('mongoose')
const profileSchema = new Schema(
  {
    name: String,
    img: {
      type: String,
      default:
        'https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/'
    }
  },
  {}
)
module.exports = model('Profile', profileSchema)