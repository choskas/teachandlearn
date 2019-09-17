const { Schema, model } = require('mongoose')
// const plm = require('passport-local-mongoose')

const sessionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },

    date: {
      type: Number,
      required: true
    },

    place: {
      type: String,
      required: true
    },

    group: {
      ref: 'StudyGroup',
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
// userSchema.plugin(plm, { usernameField: 'email' })
module.exports = model('Session', sessionSchema)