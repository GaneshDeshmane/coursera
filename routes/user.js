const express = require('express')
const {Router} = require('express')
const jwt = require('jsonwebtoken')
const {z} = require('zod')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const {UserModel, CourseModel, PurachseModel} = require('../db')
const authMiddleware = require('../Middlewares/authMiddleware')
const UserRouter = Router()
UserRouter.use(express.json())

const SALT_ROUNDS = 10;

UserRouter.post('/signup', async function(req, res) {
    const RequireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        FirstName: z.string().min(3),
        LastName: z.string()
    })
    const ParseData = RequireBody.safeParse(req.body)
    if (!ParseData.success) {
        return res.status(402).json({
            msg: 'invalid credentials'
        })
    }
    try {
        const Check = await UserModel.findOne({
            email: ParseData.data.email
        })
        if (Check) {
            return res.status(402).json({
                msg: 'user already exists'
            })
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }

    const HashedPassword = await bcrypt.hash(ParseData.data.password, SALT_ROUNDS)

    try {
        await UserModel.create({
            email: ParseData.data.email,
            password: HashedPassword,
            FirstName: ParseData.data.FirstName,
            LastName: ParseData.data.LastName
        })
        res.status(201).json({
            msg: 'user signed up successfully'
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

UserRouter.post('/signin', async function(req, res) {
    const RequireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const ParseData = RequireBody.safeParse(req.body)
    if (!ParseData.success) {
        return res.status(402).json({
            msg: 'invalid credentials'
        })
    }

    let checkUser;
    try {
        checkUser = await UserModel.findOne({
            email: ParseData.data.email
        })
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }

    if (!checkUser) {
        return res.status(402).json({
            msg: 'invalid credentials'
        })
    }

    const PasswordMatched = await bcrypt.compare(ParseData.data.password, checkUser.password);
    if (PasswordMatched) {
        const token = jwt.sign({
            userId: checkUser._id
        }, JWT_USER_PASSWORD)
        res.status(200).json({
            token
        })
    } else {
        res.status(402).json({
            msg: 'invalid credentials'
        })
    }
})

UserRouter.get('/purchases', authMiddleware, async function(req, res) {
    const userId = req.userId
    const coursePurchased = await PurachseModel.find({
        userId: userId
    })
    res.json({
        coursePurchased
    })
})

module.exports = {
    UserRouter: UserRouter
}