const products = require('../models/products')
const mongoose = require('mongoose')
const users = require('../models/kisan')
const cart = require('../models/cart')

module.exports.getProductsAll = async (req, res, next) => {
  try {
    let all_products = await products.find({})
    res.render('users/products-list', {
      products: all_products,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    let product = await products.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
    // console.log(product)
    res.render('users/product-details', {
      product: product,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getAddtoCartById = async (req, res, next) => {
  try {
    let pid = req.params.id

    const cart_obj = await cart.findOne({
      userid: req.user._id,
    })
    cart_obj.cartitems.push({
      prodid: pid,
      quantity: 1,
    })
    cart_obj.save()
    console.log(cart_obj)
    res.redirect('/user/cart/show')
  } catch (err) {
    next(err)
  }
}

module.exports.getCartShow = async (req, res, next) => {
  try {
    let cart_obj = await cart
      .findOne({
        userid: req.user._id,
      })
      .populate('cartitems.prodid')

    let totalPrice = 0
    cart_obj.cartitems.forEach((item) => {
      totalPrice += parseInt(item.prodid.price) * parseInt(item.quantity)
      console.log(cart_obj.cartitems.length)
    })

    res.render('users/cart', {
      cart: cart_obj,
      totalPrice,
      cartQuantity: cart_obj.cartitems.length,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getCartDecrease = async (req, res, next) => {
  const { id } = req.query
  console.log(id)
  try {
    // let user = await users
    //   .findOne({
    //     _id: req.user._id,
    //   })
    //   .populate("cart.id");

    // console.log(user.cart);
    let carts = await cart
      .findOne({
        userid: req.user._id,
      })
      .populate('cartitems.prodid')

    let totalPrice = 0
    // cartitems=await cart.find({
    //   userid:req.user._id,
    // })
    console.log('hey')
    console.log(carts)
    carts.cartitems.forEach((item) => {
      console.log(item.prodid._id)
      if (item.prodid._id == id) {
        item.quantity--
        if (item.quantity <= 0) {
          // Remove the item from the cart if quantity becomes zero or less
          carts.cartitems.pull(item._id)
        }
      }
      totalPrice += item.prodid.price * item.quantity
    })
    carts.save()
    res.send({
      cart: carts,
      totalPrice,
      cartQuantity: carts.cartitems.length,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getCartIncrease = async (req, res, next) => {
  const { id } = req.query
  console.log(id)
  try {
    // let user = await users
    //   .findOne({
    //     _id: req.user._id,
    //   })
    //   .populate("cart.id");

    // console.log(user.cart);
    let carts = await cart
      .findOne({
        userid: req.user._id,
      })
      .populate('cartitems.prodid')

    let totalPrice = 0
    // cartitems=await cart.find({
    //   userid:req.user._id,
    // })
    console.log('hey')
    console.log(carts)
    carts.cartitems.forEach((item) => {
      console.log(item.prodid._id)
      if (item.prodid._id == id) {
        item.quantity++
      }
      totalPrice += item.prodid.price * item.quantity
    })
    carts.save()
    res.send({
      cart: carts,
      totalPrice,
      cartQuantity: carts.cartitems.length,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.postAddReview = async (req, res, next) => {
  const { productId, review } = req.body

  try {
    let product = await products.findOne({ _id: productId })
    product.reviews.unshift({
      details: review,
      userId: req.user._id,
    })
    product.save()
    let user = await users.findOne({
      _id: req.user._id,
    })
    res.send({
      reviews: product.reviews,
      user: {
        name: user.name,
      },
    })
  } catch (err) {
    next(err)
  }
}
