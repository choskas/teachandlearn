const {
  Schema,
  model
} = require('mongoose')


const subjectsSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  themes: {
    type: String,
    required: true
  },

  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  img: {
    type: String,
    default: 'https://i.ibb.co/C58TRWR/astrology-astronomy-background-2694037.jpg'
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Subject', subjectsSchema)