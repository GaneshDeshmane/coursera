const express = require('express')
const {Router}=require('express')
const jwt = require('jsonwebtoken')
const {z }=require('zod')

const dotenv = require('dotenv')

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const {UserModel, CourseModel} = require('../db')
const authMiddleware = require('../Middlewares/authMiddleware')
const UserRouter = Router()
UserRouter.use(express.json())

UserRouter.post('/signup',async function(req,res){
    const RequireBody = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    FirstName : z.string().min(3),
    LastName : z.string()
})
 const ParseData = RequireBody.safeParse(req.body)
 if(!ParseData.success){
    res.json({
        msg : 'invalid credintials'
    })
    return
 }
   const Check =  await UserModel.findOne({
        email : ParseData.data.email
    })
    if(Check){
        res.json({
            msg : 'user already exist'
        })
        return
  
    }
try{
await UserModel.create({
    email : ParseData.data.email,
    password : ParseData.data.password,
    FirstName : ParseData.data.FirstName,
    LastName : ParseData.data.LastName
})
res.json({
    msg : 'user signed up successfully'
})}catch(e){
    e : e.error
}
})
UserRouter.post('/signin',async function(req,res){
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
         checkUser =  await UserModel.findOne({
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
    }

 const token = jwt.sign({
        userId : checkUser._id
    },JWT_SECRET)
    res.json({
        token
    })

})
UserRouter.get('/purchases',authMiddleware,async function(req,res){
    const coursePurchased = await CourseModel.find({})
    res.json({
        coursePurchased
    })
})
module.exports = {
    UserRouter : UserRouter
}