import db from "../config/mongoConfig.js"
import bcrypt from 'bcrypt'
import { htmlTemplate } from "../utils/resetHTML.js"
import jwt from 'jsonwebtoken'
import { transporter } from "../config/nodemailerConfig.js"
import createAuthToken from "../utils/createAuthToken.js"

//@Route    POST api/users
//@Access   Public
//@Func     login user
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
                message: err.message
            })
        }
    }
}

//@Route    POST api/users/register
//@Access   Public
//@Func     register user
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
            message: err.message
        })
    }
}

//@Route    POST api/userslogout
//@Access   Private
//@Func     logout user
function logoutUser(req, res){
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true
    }).json({message: 'User logged out'})
}


//@Route    POST api/users/reset-link
//@Access   Public
//@Func     get reset password link
async function sendResetLink(req, res){
    const {email} = req.body
    try {
        const user = await db.collection('users').findOne({'email': email})
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
            expiresIn: '3m',
        })
        const link = 'http://localhost:3000/reset?token='+token+'^'+Date.now().toString()
    
        const mailOptions = {
          from: 'noreply.thenewsapp@gmail.com',
          to: email,
          subject: 'Password Reset Link',
          html: htmlTemplate(link)
        };
        if(user){
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                res.status(500).json({message: error})
              } else {
                res.status(200).json({message: 'Please check your inbox for the reset link.'})
              }
            });
        }else {
            res.status(401).json({message: 'No user found matching this email.'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//@Route    POST api/users/reset
//@Access   Public
//@Func     reset password from reset link
async function resetUserPassword(req, res){
    const {password} = req.body
    try {
        const hashedPass = await bcrypt.hash(password, 10)
        await db.collection('users').updateOne({email: req.user.email}, {$set: {password: hashedPass}})
        res.status(200).json({message: 'Password updated, try logging in,'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export {
    loginUser,
    registerUser,
    logoutUser,
    sendResetLink,
    resetUserPassword,
}