const {Router}=require('express')
const {CourseModel} =require('../db')

const CourseRouter = Router()

CourseRouter.post('/purchases',function(req,res){
    
})
CourseRouter.get('/preview',function(req,res){
    const course = CourseModel.find({})
    res.json({
        course})
})
module.exports = {
    CourseRouter : CourseRouter
}
