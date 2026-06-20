const {Router}=require('express')
const {CourseModel} =require('../db')

const CourseRouter = Router()


CourseRouter.get('/preview',function(req,res){
    const course = CourseModel.find({})
    res.json({
        course})
})
module.exports = {
    CourseRouter : CourseRouter
}
