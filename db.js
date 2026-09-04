const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.connect(process.env.mongodb)

const UserSchema = new Schema({
    email : {type : String, unique : true},
    name : String,
    password : String,
    FirstName : String,
    LastName : String,
})

const CoursesSchema = new Schema({
    title : String,
    description : String,
    Price : Number,
    ImageUrl : String,
    CreatorId : { type: ObjectId, ref: 'Admin' }
})

const AdminSchema = new Schema({
    email : {type : String, unique : true},
    name : String,
    password : String,
    FirstName : String,
    LastName : String
})

const PurchasesSchema = new Schema({
    userId : { type: ObjectId, ref: 'User' },
    courseId : { type: ObjectId, ref: 'Courses' }
})

const CourseContent = new Schema({
    courseId : { type: ObjectId, ref: 'Courses' },
    content : [ObjectId],
    videoUrl : String
})

const UserModel = mongoose.model('User', UserSchema)
const CourseModel = mongoose.model('Courses', CoursesSchema)
const AdminModel = mongoose.model('Admin', AdminSchema)
const PurachseModel = mongoose.model('Purchase', PurchasesSchema)
const CourseContentModel = mongoose.model('CourseContent', CourseContent)

module.exports = {
    UserModel, CourseModel, AdminModel, PurachseModel, CourseContentModel
}