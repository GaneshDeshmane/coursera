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
const verified = jwt.verify(token,JWT_SECRET)
if(verified){
    req.userId = verified.userId
    next()
}else({
    msg : 'admin not found'
})
}

module.exports = {
    AdminMiddleware
}