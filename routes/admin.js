const express =require('express')
const {Router} = require('express')
const {z}= require('zod')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD
const {AdminMiddleware} = require('../Middlewares/AdminMiddleware')
const AdminRouter = Router()
const {AdminModel, CourseModel} = require('../db')

AdminRouter.use(express.json())//it is important either get invalid cred cause body become undefiend
AdminRouter.post('/signup',async function(req,res){
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
AdminRouter.post('/signin',async function(req,res){
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
    let admin;
    try{
         admin =  await AdminModel.findOne({
        email : ParseData.data.email,
        password : ParseData.data.password
    })}catch(e){
        res.json({
            error : e.error
        })
    }
    if(!admin){
        res.json({
            msg : 'invalid credintials'
        })
        return
    }else{
    const token = jwt.sign({
        id : admin._id
    },JWT_ADMIN_PASSWORD )
    res.json({
        token
    })}
})
AdminRouter.post('/course',AdminMiddleware,async function(req,res){
    const title = req.body.title;
    const description = req.body.description;
    const Price = req.body.Price;
    const imageUrl = req.body.imageUrl
    const adminId = req.adminId
    try{
    const course = await CourseModel.create({
    title,
    description,
    Price,
    imageUrl,
    CreatorId : adminId
   })
   res.json({
    msg : 'course created successfully',
    courseId :  course._id
   })
}catch(e){
    console.log(e)
    res.json({
        msg : "invalid error"
    })
}

})
AdminRouter.put('/course',AdminMiddleware,async function(req,res){
    const title =req.body.title;
    const description = req.body.description;
    const Price = req.body.Price;
    const ImageUrl =req.body.ImageUrl
    const courseId = req.body.courseId
    const adminId = req.adminId
    try{
    const course = await CourseModel.updateOne({
        _id : courseId,
        CreatorId  : adminId//when condition match where creatorId is same of the creator who have the same courseId 
        //then it will update 
    },{
        title : title,
        description : description,
        Price : Price,
        ImageUrl:ImageUrl
    })
    res.json({
        msg : 'course updated successfully'
    })
}
    catch(e){

    }
})
AdminRouter.delete('/course',AdminMiddleware,async function(req,res){
    const title = req.body.title;
    try {
        await CourseModel.deleteOne({
        title : title
    })
    } catch (error) {
        
    }
    
})
AdminRouter.get('/course/bulk',AdminMiddleware,async function(req,res){
    const adminId = req.adminId
   const courses = await CourseModel.find({
        CreatorId  : adminId
    })
    res.json({
        
        courses
    })
})
module.exports = {
    AdminRouter : AdminRouter
}