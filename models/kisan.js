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

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bycrpt.genSalt(10);
    const hashpass = await bycrpt.hash(this.pswd, salt);
    this.pswd = hashpass;
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model("users", UserSchema); //creating the model of users with schema
