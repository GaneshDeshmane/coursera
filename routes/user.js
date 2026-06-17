const {Router}=require('express')
const {UserModel} = require('../db')
const UserRouter = Router()


UserRouter.post('/signup',function(req,res){

})
UserRouter.post('/signin',function(req,res){
     

})
UserRouter.get('/purchases',function(req,res){
    
})
module.exports = {
    UserRouter : UserRouter
}