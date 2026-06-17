const {Router}=require('express')

const CourseRouter = Router()

CourseRouter.post('/purchases',function(req,res){

})
CourseRouter.get('/preview',function(req,res){
    res.json({
        msg : 'course preview'
    })
})
module.exports = {
    CourseRouter : CourseRouter
}