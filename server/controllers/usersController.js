import db from "../config/mongoConfig.js"
import bcrypt from 'bcrypt'
import createAuthToken from "../utils/createAuthToken.js"

async function loginUser(req, res) {
    const { email, password } = req.body
    if (email && password) {
        try {
            const user = await db.collection('users').findOne({
                'email': email
            })
            if (user && await bcrypt.compare(password, user.password)) {
                createAuthToken(res, user._id)
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                })
            } else {
                res.status(401).json({
                    message: 'Wrong email or password'
                })
            }
        } catch (err) {
            res.status(401).json({
                message: err
            })
        }
    }
}
async function registerUser(req, res) {
    const {
        email,
        password,
        name
    } = req.body
    try {
        const existingUser = await db.collection('users').findOne({
            'email': email
        })
        if (existingUser) {
            res.status(401).json({
                message: 'User already exists'
            })
        } else {
            const hashedPass = await bcrypt.hash(password, 10)
            await db.collection('users').insertOne({
                name,
                email,
                password: hashedPass
            })
            const user = await db.collection('users').findOne({'email': email})
            if (user) {
                createAuthToken(res, user._id)
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                })
            } else {
                res.status(500).json({
                    message: 'Sorry, Something went wrong.'
                })
            }
        }
    } catch (err) {
        res.json({
            message: err
        })
    }
}

function logoutUser(req, res){
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true
    }).json({message: 'User logged out'})
}

export {
    loginUser,
    registerUser,
    logoutUser
}