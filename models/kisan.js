const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  isseller: {
    type: Boolean,
    default: false,
  },
  address:{
    type:String,
    required:true
  }
})

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(this.password, salt)
    this.password = hashpass
    next()
  } catch (err) {
    next(err)
  }
})
module.exports = mongoose.model('users', UserSchema) //creating the model of users with schema
