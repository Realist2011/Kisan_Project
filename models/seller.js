const mongoose = require('mongoose')
const { Schema } = mongoose
const sellerschema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'kisan',
  },
  Location:{
    type:String,
  },
  bank:{
    type:String,
  },
  AC_no:{
    type:Number,
    required:true,
  },
  bank_branch:{
    type:String,
  }
})

module.exports = mongoose.model('seller', sellerschema)
