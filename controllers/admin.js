const mongoose = require('mongoose')
const products = require('../models/products')
const bodyParser = require('body-parser')



/*module.exports.postAddProduct = async(req,res,next)=>{
    console.log(req.body)
    const{name,price,seller,imageUrl,description,category} = req.body
    try{
        await products.create({
            name,
            price,
            seller,
            imageUrl,
            description,
            category



        })
        res.redirect('/admin/products/all')
    }
    catch(err){
        next(err)
    }


}*/

module.exports.postAddProduct = async(req,res,next)=>{
    //console.log(req.body)
    const {name,price,seller,imageUrl,description,category} = req.body
    try{
        await products.create({
            name,
            price,
            seller,
            imageUrl,
            description,
            category



        })
        res.redirect('/admin/products/all')
    }
    catch(err){
        next(err)
    }


}

module.exports.getProductsAll = async(req,res,next)=>{
    try{
        let allProducts = await products.find({})
        res.render('admin/products-list',{products:allProducts})
    }
    catch(err){
        next(err)
    }
}

module.exports.getAddProduct = async(req,res,next)=>{
    res.render('admin/form')
}

module.exports.getIndex = (req,res,next)=>{
    res.render('admin/home')
}

module.exports.getProductId = async(req,res,next)=>{
    let id= req.params.id
    console.log(id)
    try{
        let p = await products.findOne({_id:new mongoose.Types.ObjectId(id)})
        //console.log(p)
        res.render('admin/product-detail',{
            product:p
        })
    }
    catch(err){
        next(err)
    }
}

module.exports.getUpdateProduct = async(req,res,next)=>{
    let id = req.params.id
    try{
        let p = await products.findOne({_id:new mongoose.Types.ObjectId(id)})
        
        res.render('admin/update-product',{
            product:p
        })
    }
    catch(err){
        next(err)
    }
    
}

module.exports.postUpdateProduct = async(req,res,next)=>{
    try{
        const {name,price,seller,imageUrl,description,id,category} = req.body
        const product = await products.findOne({_id:new mongoose.Types.ObjectId(id)})
        product.name = name
        product.price = price
        product.seller = seller
        product.imageUrl = imageUrl
        product.description = description
        product.save()
        res.render('admin/product-detail',{
            product
        })


    }
    catch(err){
        next(err)
    }
}

module.exports.getDeleteProduct = async(req,res,next)=>{
    try{
        const {id} = req.params
        const product = await products.deleteOne({_id:new mongoose.Types.ObjectId(id)})
        const p = await products.find({})
        res.render('admin/products-list',{products:p})
    }
    catch(err){
        next(err)
    }


}
