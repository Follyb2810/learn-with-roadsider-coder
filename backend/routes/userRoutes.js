const express = require('express');
const router = express.Router()
const {registerUser, authUser, updateUserProfile} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protect,updateUserProfile)

module.exports = router