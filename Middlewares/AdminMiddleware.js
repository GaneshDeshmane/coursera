const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

function AdminMiddleware(req,res,next){

    const token = req.body.token;
    if(!token){
        res.json({
           msg :  'token not found'
        })
        return
    }
const verified = jwt.verify({token},JWT_SECRET)
if(verified){
     userId : req.userId
    next()
}else({
    msg : 'user not found'
})
}

module.exports = {
    AdminMiddleware
}