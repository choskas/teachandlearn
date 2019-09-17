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
      enum: [1, 5, 10],
      required: true
    }
    // people: {
    //   ref: 'User',
    //   type: Array,
    //   type: Schema.Types.ObjectId
    // },
    // sessions: {
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
module.exports = model('StudyGroup', StudyGroupSchema)
