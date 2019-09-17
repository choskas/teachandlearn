const { Schema, model } = require('mongoose')
// const plm = require('passport-local-mongoose')

const subjectsSchema = new Schema(
  {
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
      enum: [1, 5, 10],
      required: true
    },
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
    // people: {
    //   ref: 'User',
    //   type: Array,
    //   type: Schema.Types.ObjectId
    // },
    // sessions: {
    //   ref: 'Session',
    //   type: Schema.Types.ObjectId
    // },
    // groups: {
    //   ref: 'StudyGroup',
    //   type: Schema.Types.ObjectId
    // }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
// userSchema.plugin(plm, { usernameField: 'email' })
module.exports = model('Subject', subjectsSchema)
