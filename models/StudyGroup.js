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
<<<<<<< HEAD
    },
    assistants: []
    // people: {
    //   ref: 'User',
    //   type: Array,
    //   type: Schema.Types.ObjectId
    // },
    // sessions: {
    //   ref: 'StudyGroup',
    //   type: Schema.Types.ObjectId
    // }
=======
      default: 'https://i.ibb.co/x2nxj3g/default-group.jpg'
    }
>>>>>>> 7cf68268da8e70061a277c1ea5826a9b6871dee1
  },
  {
    timestamps: true,
    versionKey: false
  }
)
// userSchema.plugin(plm, { usernameField: 'email' })
module.exports = model('StudyGroup', StudyGroupSchema)
