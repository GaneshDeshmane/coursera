const {Router} = require('express')
const {z}= require('zod')
const jwt = require('jsonwebtoken')
const {AdminMiddleware} = require('../Middlewares/AdminMiddleware')
const AdminRouter = Router()
const {AdminModel, CourseModel} = require('../db')

AdminRouter.post('/signup',function(req,res){
    const RequireBody = z.object({
        email : z.string().email(),
        password : z.string().min(6),
        FirstName :z.string().min(3),
        LastName : z.string()
    })
    const ParseData = RequireBody.safeParse(req.body)
    if(!ParseData.success){
        res.json({
            msg : "invalid cred"
        })
        return
    }
    const check = await AdminModel.findOne({
        email : ParseData.data.email,
    })
    if(check){
        res.json({
            msg : 'user already exist'
        })
        return
    }
try{
await AdminModel.create({
    email : ParseData.data.email,
    password : ParseData.data.password,
    FirstName : ParseData.data.FirstName,
    LastName : ParseData.data.LastName
})
res.json({
    msg : 'admin signedup successfully'
})
}catch(e){
    e : e.error
}

})
AdminRouter.post('/signin',function(req,res){
     const RequireBody = z.object({
        email : z.string().email(),
        password : z.string().min(6)
    })
    const ParseData = RequireBody.safeParse(req.body)
    if(!ParseData.success){
        res.json({
            msg : 'invalid cred'
        })
        return
    }
    let checkUser;
    try{
         checkUser =  await UserModel.find({
        email : ParseData.data.email,
        password : ParseData.data.password
    })}catch(e){
        res.json({
            error : e.error
        })
    }
    if(!checkUser){
        res.json({
            msg : 'invalid credintials'
        })
        return
    }else{
    const token = jwt.sign({
        userId : checkUser._id
    },JWT_SECRET)
    res.json({
        token
    })}
})
AdminRouter.post('/course',AdminMiddleware,async function(req,res){
    const Course = req.body.Course;
    await CourseModel.findOne({
        Course
    })
})
AdminRouter.put('/course',AdminMiddleware,function(req,res){

})
AdminRouter.delete('/course',AdminMiddleware,function(req,res){

})
AdminRouter.get('/course/bulk',function(req,res){

})
module.exports = {
    AdminRouter : AdminRouter
}