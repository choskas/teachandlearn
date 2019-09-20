const { Schema, model } = require('mongoose')

const meetingSchema = new Schema(
  {
    assistants: [],
    teacher: {

      type: String,
 
    },

    date: {
      type: Date
    
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
        'https://i.ibb.co/gWjqGf2/adolescent-connection-discussion-1595391.jpg'
      //required: true
    },
   name: String,
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
 
  },
  {
    timestamps: true,
    versionKey: false
  }
)

meetingSchema.index({
  location: '2dsphere'
})


module.exports = model('Meeting', meetingSchema)
