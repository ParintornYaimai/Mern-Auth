const express = require('express')
const router = express.Router()
const {test,updateUser,deleteUser} = require('../controller/userController')
const {verifyToken} = require('../utils/verifyUser')



router.get('/',test)
router.put('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)













module.exports = router