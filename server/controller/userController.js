const UserModle = require('../model/userSchema')
const bcrypt = require('bcrypt')


exports.test=(req,res)=>{
    res.send('test user route & usercontroller')
}


//updateUser
exports.updateUser=async(req,res,next)=>{
    
    if(req.user.id !== req.params.id){
        return res.status(401).send('You Can Update Only Your Account!')
    }
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hashSync(req.body.password,10)
        }
        const updateUser = await UserModle.findByIdAndUpdate(req.params.id,{$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            profilePicture:req.body.profilePicture
        }},{new:true})
        const {password,...rest} = updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

//delete
exports.deleteUser=async(req,res)=>{
    
    try {
        const user = await UserModle.findByIdAndDelete(req.params.id)
        if(req.user.id !== req.params.id){
            return res.status(400).send('You Can Delete Only Your Account')
        }
        res.status(200).send('User Has Been Delete...')
    } catch (error) {
        res.status(400).send('Server Error')
    }
}