const {Router} = require('express')

const AdminRouter = Router()
const {AdminModel} = require('../db')

AdminRouter.post('/signup',function(req,res){

})
AdminRouter.post('/signin',function(req,res){
    
})
AdminRouter.post('/course',function(req,res){

})
AdminRouter.put('/course',function(req,res){

})
AdminRouter.delete('/course',function(req,res){

})
AdminRouter.get('/course/bulk',function(req,res){

})
module.exports = {
    AdminRouter : AdminRouter
}