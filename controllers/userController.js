const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const async_handler = require('express-async-handler')
require('dotenv').config()

const registerController = async_handler(async (req, res) => {  
    const {username, email, password} = req.body

    const existingUserEmailID = await User.findOne({ where : {email: email }})
    if (existingUserEmailID) {
        return res.status(409).json({ error: 'Email already registered' })
    }
    const existingUsername = await User.findOne({ where : { username : username }})
    if(existingUsername){
        return res.status(409).json({ error : 'Username already registered '})
    }
    const user = await User.create({
        username : username, 
        email : email, 
        password : password})
    await user.save()

    res.status(200).send({ user, message: "User created successfully!" })
})

const loginController = async_handler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({ where : { email: email }})

    if (!user) {
        return res.status(401).json({message : "User not registered!"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" })
    }

    const accessToken = jwt.sign({
        user: {
            _id: user.id,
            username: user.username,
            email: user.email
        }
    },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: "180m" });
    

    res.status(200).send({ accessToken, message: "Logged In successfully!" });
})

const getUsers = async_handler(async(req,res)=>{
    const user_result = await User.findAll()
    const totalUsers = await User.count()
    if(!user_result){
        res.status(404).json({message : "User result not retrieved successfully!"})
    }

    res.status(200).json({data : user_result ,users : totalUsers,  message : "Users retrieved successfully!"})
})
module.exports = {registerController, loginController, getUsers}