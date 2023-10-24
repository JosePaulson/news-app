import express from 'express'
import { loginUser, logoutUser, registerUser, sendResetLink, resetUserPassword } from '../controllers/usersController.js'
import verifyUserAuth from '../utils/verifyAuth.js'

const router = express.Router()

router.post('/', loginUser)
router.post('/logout', logoutUser)
router.post('/register', registerUser)
router.post('/verify', verifyUserAuth)
router.post('/reset-link', sendResetLink)
router.post('/reset', (req, res, next)=>{verifyUserAuth(req, res, next, req.body.token)}, resetUserPassword)

export default router