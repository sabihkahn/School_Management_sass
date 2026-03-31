import express from 'express'
import { check, login, logout, Register, update } from '../controller/authController.js'
import { Authorization } from '../middleware/AuthMiddleware.js'

const router = express.Router()

router.post("/register",Register)

router.post("/login",login)

router.post('/logout',logout)

router.get('/check',Authorization,check)

router.put('/update',Authorization,update)




export default router