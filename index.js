const express = require('express');
const {UserRouter}=require('./routes/user')
const {CourseRouter} = require('./routes/course')
const {AdminRouter} = require('./routes/admin')
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose')
const app = express()

    app.use('/user',UserRouter)
    app.use('/course',CourseRouter)
    app.use('/admin',AdminRouter)
    async function main(){
        await mongoose.connect(process.env.mongodb)
    }
    main()
    
app.listen(3000)