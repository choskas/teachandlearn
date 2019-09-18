const { Schema, model } = require('mongoose')
// const plm = require('passport-local-mongoose')

const meetingSchema = new Schema(
  {


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

    // location: {
    //   type: {
    //     type: String,
    //     default: 'Point'
    //   },
    //   address: {
    //     type: String
    //   },
    //   coordinates: {
    //     type: [Number]
    //   }
    // },

    address: {
      type: String
    },

    description: {
      type: String
    },
    images: {
      type: [String]
      //required: true
    },
    name: {
      type: String
      //required: true
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

// meetingSchema.index({
//   location: '2dsphere'
// })

// userSchema.plugin(plm, { usernameField: 'email' })
module.exports = model('Meeting', meetingSchema)
