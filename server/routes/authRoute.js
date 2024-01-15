const express = require('express')
const router = express.Router()
const {register,login,google,logout} = require('../controller/authController')


router.post('/register',register)
router.post('/login',login)
router.post('/google',google)
router.get('/logout',logout)












module.exports = router