const express = require('express')
const {Router} = require('express')
const {z} = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD
const {AdminMiddleware} = require('../Middlewares/AdminMiddleware')
const AdminRouter = Router()
const {AdminModel, CourseModel} = require('../db')

const SALT_ROUNDS = 10;

AdminRouter.use(express.json())

AdminRouter.post('/signup', async function(req, res) {
    const RequireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        FirstName: z.string().min(3),
        LastName: z.string()
    })
    const ParseData = RequireBody.safeParse(req.body)
    if (!ParseData.success) {
        return res.status(402).json({
            msg: "invalid cred"
        })
    }

    try {
        const check = await AdminModel.findOne({
            email: ParseData.data.email,
        })
        if (check) {
            return res.status(402).json({
                msg: 'admin already exists'
            })
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }

    const HashedPassword = await bcrypt.hash(ParseData.data.password, SALT_ROUNDS)

    try {
        await AdminModel.create({
            email: ParseData.data.email,
            password: HashedPassword,
            FirstName: ParseData.data.FirstName,
            LastName: ParseData.data.LastName
        })
        res.status(201).json({
            msg: 'admin signed up successfully'
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

AdminRouter.post('/signin', async function(req, res) {
    const RequireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const ParseData = RequireBody.safeParse(req.body)
    if (!ParseData.success) {
        return res.status(402).json({
            msg: 'invalid cred'
        })
    }

    let admin;
    try {
        admin = await AdminModel.findOne({
            email: ParseData.data.email
        })
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }

    if (!admin) {
        return res.status(402).json({
            msg: 'invalid credentials'
        })
    }

    const PasswordMatched = await bcrypt.compare(ParseData.data.password, admin.password);
    if (!PasswordMatched) {
        return res.status(402).json({
            msg: 'invalid credentials'
        })
    }

    const token = jwt.sign({
        id: admin._id
    }, JWT_ADMIN_PASSWORD)
    res.json({
        token
    })
})

AdminRouter.post('/course', AdminMiddleware, async function(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const Price = req.body.Price;
    const imageUrl = req.body.imageUrl
    const adminId = req.adminId
    try {
        const course = await CourseModel.create({
            title,
            description,
            Price,
            imageUrl,
            CreatorId: adminId
        })
        res.json({
            msg: 'course created successfully',
            courseId: course._id
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: "error creating course"
        })
    }
})

AdminRouter.put('/course', AdminMiddleware, async function(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const Price = req.body.Price;
    const ImageUrl = req.body.ImageUrl
    const courseId = req.body.courseId
    const adminId = req.adminId
    try {
        const course = await CourseModel.updateOne({
            _id: courseId,
            CreatorId: adminId
            // when condition matches where CreatorId is the same as the admin who owns this courseId, it updates
        }, {
            title: title,
            description: description,
            Price: Price,
            ImageUrl: ImageUrl
        })
        if (course.matchedCount === 0) {
            return res.status(404).json({
                msg: 'course not found'
            })
        }
        res.json({
            msg: 'course updated successfully'
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'error updating course'
        })
    }
})

AdminRouter.delete('/course', AdminMiddleware, async function(req, res) {
    const title = req.body.title;
    const adminId = req.adminId
    try {
        const result = await CourseModel.deleteOne({
            title: title,
            CreatorId: adminId
        })
        if (result.deletedCount === 0) {
            return res.status(404).json({
                msg: 'course not found'
            })
        }
        res.json({
            msg: 'course deleted successfully'
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'error deleting course'
        })
    }
})

AdminRouter.get('/course/bulk', AdminMiddleware, async function(req, res) {
    const adminId = req.adminId
    const courses = await CourseModel.find({
        CreatorId: adminId
    })
    res.json({
        courses
    })
})

module.exports = {
    AdminRouter: AdminRouter
}