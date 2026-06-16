const mongoose = require('mongoose')

const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId
const UserSchema = new Schema({
    email : String,
    name : String,
    password : String
})
const CoursesSchema=new Schema({
    title : String,
    description : String,
    userId : objectId
})
const AdminSchema = new Schema({
    email : String,
    password : String
})


const UserModel = mongoose.model('User',UserSchema)
const CourseModel = mongoose.model('Courses',CoursesSchema)
const AdminModel = mongoose.model('Admin',AdminSchema)
module.exports ={
    UserModel,CourseModel,AdminModel
}