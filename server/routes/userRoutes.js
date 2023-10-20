import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/usersController.js'
import verifyUserAuth from '../utils/verifyAuth.js'

const router = express.Router()

router.post('/', loginUser)
router.post('/logout', logoutUser)
router.post('/register', registerUser)
router.post('/verify', verifyUserAuth)

export default router