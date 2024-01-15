const UserModle = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')


exports.register=async(req,res)=>{
    const {username,email,password} = req.body
    try {
        const userExist = await UserModle.findOne({email})
        if(userExist){
            return res.status(400).send('User already exists')
        }else{
            if (!password) {
                return res.status(400).send('Password is required');
            }
            const salt = bcrypt.genSaltSync(10)
            //encrypt
            const encrypt = bcrypt.hashSync(password,salt)
            const user = await UserModle.create({
                username,
                email,
                password:encrypt
            })
            if(user){
                res.json({
                    id:user._id,
                    username,
                    email,
                    message:'Register Success'
                })
            }
        }

    } catch (error) {
        res.status(500).send('Server Error')
    }
}
exports.login=async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModle.findOne({email})
        if(!user){
            return res.status(400).send('User not found')
        }
        else{
            const isMatch = bcrypt.compareSync(password,user.password)
            if(!isMatch){
                return res.status(400).send('Password Invalid')
            }else{
                //Generate Token
                jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'},(err,token)=>{
                    if(err){
                        throw err
                    }else{
                        const expiryDate = new Date(Date.now()+3600000)
                        const {password:hashedPassword,...rest} = user._doc
                        res.cookie('access_token',token,{httpOnly:true,sameSite: "strict",expires: expiryDate}).status(200).json(rest)
                    }
                })
            }
        }
    } catch (error) {
        res.status(400).send('Server Error')
    }

}
exports.google=async(req,res)=>{
    try {
        const user = await UserModle.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password:hashedPassword,...rest} = user._doc
            const expiryDate = new Date(Date.now() + 3600000)
            res.cookie('access_token',token,{httpOnly:true,sameSite:'strict',expires:expiryDate}).status(200).json(rest)
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString().slice(-8)
            const hashedPassword = bcrypt.hashSync(generatePassword,10)
            const newUser = new UserModle({
                username:req.body.username.split('').join('').toLowerCase() + Math.floor(Math.random() * 10000),
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })
            await newUser.save()
            const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET)
            const {password:hashedPassword2,...rest} = newUser._doc
            const expiryDate = new Date(Date.now() + 3600000) // 1hour
            res.cookie('access_token',token,{
                httpOnly:true,
                expires:expiryDate,
                sameSite:'strict'
            }).status(200).json(rest)
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
}
exports.logout=(req,res)=>{
    res.clearCookie('access_token').status(200).json('Logout Success')
}