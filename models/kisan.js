const mongoose = require("mongoose");
const { Schema } = mongoose;


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
  cart:[{
    id:{
      type:Schema.Types.ObjectId,
      ref:'products'
    },
    quantity:Number
  }]
});

module.exports = mongoose.model("users", UserSchema); //creating the model of users with schema
