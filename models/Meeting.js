const { Schema, model } = require('mongoose')

const meetingSchema = new Schema(
  {
    assistants: [],
    teacher: {
      //ype: Schema.Types.ObjectId,
      //required: true,
      type: String
      //ref: 'User'
    },

    date: {
      type: Date
      //required: true
    },

    location: {
      type: {
        type: String,
        default: 'Point'
      },
      address: {
        type: String
      },
      coordinates: {
        type: [Number]
      }
    },

    description: {
      type: String
    },
    img: {
      type: String,
      default:
        'https://i.ibb.co/ZJpB208/default-meetings.jphttps://i.ibb.co/ZJpB208/default-meetings.jpg'
      //required: true
    },
    name: {
      type: String
      //required: true
    },
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
    // group: {
    //   type: String,
    //   required: true,
    //   ref: 'StudyGroup',
    //   type: Schema.Types.ObjectId
    // }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

meetingSchema.index({
  location: '2dsphere'
})

// userSchema.plugin(plm, { usernameField: 'email' })
module.exports = model('Meeting', meetingSchema)
