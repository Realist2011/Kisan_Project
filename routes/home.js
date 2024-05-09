const path = require('path')
const express = require('express')
const router = express.Router()

const homeController =  require('../controllers/home')
router.get('/',homeController.getHome)
router.get('/login',homeController.getLogin)
router.get('/signup',homeController.getSignup)

module.exports = router
