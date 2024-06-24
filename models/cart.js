const mongoose = require('mongoose')
const products = require('./products')
const { Schema } = mongoose
const cartschema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'kisan',
  },
  cartitems: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      prodid: {
        type: Schema.Types.ObjectId,
        ref: 'products',
      },
    },
  ],
})

module.exports = mongoose.model('cart', cartschema)
