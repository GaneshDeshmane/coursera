const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD

function AdminMiddleware(req,res,next){

    const token = req.headers.token;
    if(!token){
        res.json({
           msg :  'token not found'
        })
        return
    }
try{
const verified = jwt.verify(token,JWT_ADMIN_PASSWORD)

    req.adminId = verified.id
    next()
}catch(e){
    res.json({
        msg : 'admin not found'
    })
}

}

module.exports = {
    AdminMiddleware
}