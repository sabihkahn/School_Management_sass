import express from 'express'
import { createTeacher, getAllTeachers } from '../controller/teacherController.js'
import { Authorization } from '../middleware/AuthMiddleware.js'

const router = express.Router()


router.post('/createTeacher',Authorization,createTeacher)
router.get('/getAllteacher',Authorization,getAllTeachers)
export default router