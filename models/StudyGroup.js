const { Schema, model } = require('mongoose')
// const plm = require('passport-local-mongoose')

const StudyGroupSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
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
    img: {
      type: String,
      default: 'https://i.ibb.co/vqtB5BW/adult-chair-conversation-2422290.jpg'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
// userSchema.plugin(plm, { usernameField: 'email' })
module.exports = model('StudyGroup', StudyGroupSchema)
