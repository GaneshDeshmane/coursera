

function authMiddleware(req,res,next){
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET
    const token = req.body.token;
    if(!token){
        res.json({
            msg : 'token required'
        })
    }return

    const verified = jwt.verify(token,JWT_SECRET)
    if(verified){
        res.json({
            msg : 'user verified'
        })
        next()
        req.userId = verified.userId
    }else{
        res.json({
            msg : 'user not found'
        })
    }
}

module.exports = authMiddleware