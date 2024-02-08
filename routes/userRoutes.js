const express = require('express')
const router = express.Router()
const {registerController, loginController, getUsers} = require('../controllers/userController')


router.post('/signup', registerController)
router.post('/login', loginController)
router.get('/getusers', getUsers)


module.exports = router