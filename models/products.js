const mongoose = require('mongoose')
const {Schema} = mongoose
const productSchema = new Schema({
    name:{
        type:String,
        required:true

    },
    seller:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String
    },
    description:String,
    date:{type:Date,default:Date.now},
    reviews:[{
        details:String,
        userId:{
            type:Schema.Types.ObjectId,
            ref:'users'

        }
    }],
    category:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('products',productSchema)
