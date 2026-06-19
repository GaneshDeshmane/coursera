const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const UserSchema = new Schema({
    email : {type : String,unique : true},
    name : String,
    password : String,
    FirstName : String,
    LastName : String,
})

const CoursesSchema=new Schema({
    title : String,
    description : String,
    userId : objectId,
    Price : Number,
    ImageUrl : String,
    CreatorId : objectId
})
const AdminSchema = new Schema({
    email : {type : String,unique : true},
    name : String,
    password : String,
    FirstName : String,
    LastName : String
})
const PurchasesSchema = new Schema({
    userId : objectId,
    courseId : objectId,

})
const CourseContent = new Schema({
    courseId : objectId,
    content : [objectId],
    videoUrl : String
})



const UserModel = mongoose.model('User',UserSchema)
const CourseModel = mongoose.model('Courses',CoursesSchema)
const AdminModel = mongoose.model('Admin',AdminSchema)
const PurachseModel = mongoose.model('Purchase',PurchasesSchema)
module.exports ={
    UserModel,CourseModel,AdminModel,PurachseModel
}