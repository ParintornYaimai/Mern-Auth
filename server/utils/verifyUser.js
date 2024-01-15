const jwt = require('jsonwebtoken')

exports.verifyToken=(req,res,next)=>{
    const token = req.cookies.access_token
    if(!token)return res.status(400).send('You Need To Login')

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).send('Token is not valid')
        req.user = user
        next()
    })
}