const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pswd: {
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
});

module.exports = mongoose.model("users", UserSchema); //creating the model of users with schema
