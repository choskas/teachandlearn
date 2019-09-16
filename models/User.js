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
  }
},{
  timestamps: true,
  versionKey: false
})

userSchema.plugin(PLM,{
  usernameField: 'userName'
})

module.exports = model ('User', userSchema)