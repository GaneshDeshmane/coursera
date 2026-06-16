const express = require('express')
const jwt = require('jsonwebtoken')
const {UserModel,CourseModel,AdminModel} = require('./db')
const  authMiddleware=require('./authMiddleware')
const {z}= require('zod')
const app = express()
app.use(express.json())
app.post('/user/signup',async function(req,res){
    const RequireBody = z.object({
        email : z.string().email(),
        password : z.string().min(6).max(100),
        name : z.string().min(3).max(100)
    })
    const ParseData = RequireBody.safeParse(req.body)
    if(!ParseData.success){
        res.json({
            msg : 'invalid credintials',
            err : ParseData.error.message
        })
    }
    const check= await UserModel.findOne({
        email
    })
    if(check){
       res.json( 
        {msg : 'user already exist'}
       
    )
    return
    }
    try{
    await UserModel.create({
        name,
        email,
        password
    })
    res.json({
        msg : 'signed up successfully'
    })
}catch(e){
    
}
    
    
})
app.post('/user/signin',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

   const checkuser =  await UserModel.findOne({
        email : email,
        password:password
    })

    if(checkuser){
        jwt.sign({userId},JWT_SECRET)
        res.json({
            token
        })
    }else{
        res.json({
            msg :'user not dound'
        })
    }
})
app.post('/user/purchases',function(req,res){

})

app.post('/courses/purchase',authMiddleware,async function(req,res){
    //you would expect user to pay you money
})


app.get('/course',function(req,res){
    
})
app.get('/user/courses',function(req,res){
    
})
app.post('/admin/signup',function(req,res){

})
app.post('/admin/course',function(req,res){

})
app.delete('/admin/deletecourse',function(req,res){
    
})
app.listen(3000)