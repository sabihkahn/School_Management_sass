import express from 'express'
import { createTeacher, deleteTeacher, getAllTeachers, searchTeacherByname, updateTeacher } from '../controller/teacherController.js'
import { Authorization } from '../middleware/AuthMiddleware.js'

const router = express.Router()


router.post('/createTeacher',Authorization,createTeacher)

router.get('/getAllteacher',Authorization,getAllTeachers)

router.put('/updateTeacher/:teacherid',Authorization,updateTeacher)

router.delete('/deleteTeacher/:teacherid',Authorization,deleteTeacher)

router.get('/searchTeacher',Authorization,searchTeacherByname)

export default router