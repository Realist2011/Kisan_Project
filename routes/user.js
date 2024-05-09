const path = require('path')
const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/products/all',userController.getProductsAll)
router.get('/products/:id',userController.getProductById)
router.get('/cart/add/:id',userController.getAddtoCartById)
router.get('/cart/show',userController.getCartShow)
router.get('/cart/decrease',userController.getCartDecrease)
router.get('/cart/increase',userController.getCartIncrease)
router.get('/review/add',userController.postAddReview)

module.exports = router
