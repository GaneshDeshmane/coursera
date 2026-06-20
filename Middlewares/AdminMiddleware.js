const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD

function AdminMiddleware(req,res,next){

    const token = req.body.token;
    if(!token){
        res.json({
           msg :  'token not found'
        })
        return
    }
const verified = jwt.verify(token,JWT_ADMIN_PASSWORD)
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