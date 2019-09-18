const {Schema, model} = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema= new Schema({
  email: {
    type: String,
    unique: true,
  },
  userName: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'TEACHER', 'ALUMN'],
    default: 'ALUMN'
  },
  picName: String,
  picPath: {
    type: String,
    default: 'http://www.herbeumont.be/macommune/vie-politique/conseil-communal/img/no-profile-image-png.png/image_view_fullscreen', 
  },
  profile: {
    ref: 'Profile',
    type: Schema.Types.ObjectId
  },
  subject: {
    ref: 'Subject',
    type: Schema.Types.ObjectId
  },
  meeting:{
    ref: 'Meeting',
    type: Schema.Types.ObjectId
  },
  register: Boolean,
},{
  timestamps: true,
  versionKey: false
})

userSchema.plugin(PLM,{
  usernameField: 'userName'
})

module.exports = model ('User', userSchema)