const mongoose = require('mongoose')
const products = require('../models/products')
const bodyParser = require('body-parser')
const cart = require('../models/cart')
module.exports.postAddProduct = async (req, res, next) => {
  console.log(req.body)
  const { name, price, seller, imageUrl, description, category } = req.body
  try {
    await products.create({
      name,
      price,
      seller,
      imageUrl,
      description,
      category,
    })
    res.redirect('/admin/products/all')
  } catch (err) {
    next(err)
  }
}
///////////
module.exports.getProductsAll = async (req, res, next) => {
  try {
    // let { page, limit } = req.query
    // if (!page) page = 1
    // if (!limit) limit = 15
    // let skip = (page - 1) * limit
    let allProducts = await products.find()
    res.render('admin/products-list', { products: allProducts })
    console.log()
  } catch (err) {
    next(err)
  }
}

module.exports.getAddProduct = async (req, res, next) => {
  res.render('admin/form')
}

module.exports.getIndex = (req, res, next) => {
  res.render('admin/home')
}

module.exports.getProductId = async (req, res, next) => {
  let id = req.params.id
  console.log(id)
  try {
    let p = await products.findOne({ _id: new mongoose.Types.ObjectId(id) })
    console.log(p)
    res.render('admin/product-detail', {
      product: p,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getUpdateProduct = async (req, res, next) => {
  let id = req.params.id
  try {
    let p = await products.findOne({ _id: new mongoose.Types.ObjectId(id) })
    console.log(p)
    res.render('admin/update-product', {
      product: p,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.postUpdateProduct = async (req, res, next) => {
  try {
    const { name, price, seller, imageUrl, description, id, category } =
      req.body
    const product = await products.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
    product.name = name
    product.price = price
    product.seller = seller
    product.imageUrl = imageUrl
    product.description = description
    product.save()
    res.render('admin/product-detail', {
      product,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    await products.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    })
    const cartobj = await cart.findOne({
      userid: req.user._id,
    })
    const cartobjitem = cartobj.cartitems.filter(checkid)
    function checkid(item) {
      if (item.prodid != id) return item
    }
    cartobj.cartitems = cartobjitem
    cartobj.save()
    /*let arr = req.user.cart.filter((val, arr, indx) => {
      return val.id != id;
    });
    req.user.cart = arr;*/

    //const user = await kisan.find({_id:req.user._id})
    /*req.user.cart.forEach((element) => {
      if (element.id == id) {
        let i = req.user.cart.splice(
          req.user.cart.indexOf(element),
          req.user.cart.indexOf(element) + 1
        );
      }
    });*/
    /* console.log(req.user.cart);*/
    res.redirect("/admin/products/all");

    /*array.forEach((element, => {
      
    });*/
  } catch (err) {
    next(err)
  }
}
