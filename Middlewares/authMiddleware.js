

function authMiddleware(req,res,next){
 
    const jwt = require('jsonwebtoken')
    const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD

    const token = req.headers.token
    if(!token){
        res.json({
            msg : 'token required'
        })
        return
    }
try{
    const verified = jwt.verify(token,JWT_USER_PASSWORD)
          req.userId = verified.userId
        next()
      
        

        
      
}catch(e){
    res.status(500).json({
        msg : 'internal error'
    })
}
    
}

module.exports = authMiddleware