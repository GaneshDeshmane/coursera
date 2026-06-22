const express = require('express')
const {Router}=require('express')
const {CourseModel, PurachseModel} =require('../db')
const authMiddleware = require('../Middlewares/authMiddleware')

const CourseRouter = Router()
CourseRouter.use(express.json())
CourseRouter.post('/purchase',authMiddleware,async function(req,res){
    const userId =req.userId;
    const courseId = req.body.courseId
    try{
    await PurachseModel.create({
        courseId,
        userId
    })
    res.json({
        msg : 'you have successfully purchased the course'
    })}catch(e){
        res.status(500).json({
            msg : "internal error"
        })
      
    }
})

CourseRouter.get('/preview',async function(req,res){
    const course = await CourseModel.find({})
    res.json({
        course})
})
module.exports = {
    CourseRouter : CourseRouter
}
