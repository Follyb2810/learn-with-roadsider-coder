const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const registerUser = asyncHandler(async (req, res,) => {
    const {name, email, password,pic} = req.body;
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists');
    }
    const user = await User.create({name, email, password,pic})
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('User error');
    }
  
})
const authUser = asyncHandler(async (req, res,) => {
    const {password, email} = req.body;
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid email and password');
    }
   
})


const updateUserProfile= asyncHandler( async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name|| user.name
        user.email = req.body.email|| user.email
        user.pic = req.body.pic|| user.pic

        if(req.body.password){
            user.password = req.body.password
        }
        const updateUser = await user.save()
        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            emai:updateUser.email,
            pic:updateUser.pic,
            token:generateToken(updateUser._id),
        })
    }else{
        res.status(400)
        throw new Error('user not found')
    }
   
})

module.exports = {registerUser,authUser,updateUserProfile}