import express from 'express'
import { createStudent, deletestudent, getallstudents, getallstudentsbyclassname, getAllunpaidstudents, getAllunpaidstudentsbyclassname } from '../controller/studentController.js'
import { Authorization } from '../middleware/AuthMiddleware.js'

const router = express.Router()


router.post('/createstudent',Authorization,createStudent)

router.get('/getAllunpaidstudents',Authorization,getAllunpaidstudents)

router.get('/getAllunpaidstudentsbyclassname',Authorization,getAllunpaidstudentsbyclassname)

router.get('/students',Authorization,getallstudents)

router.get('/getallstudentsbyclassname',Authorization,getallstudentsbyclassname)

router.delete('/deletestudent/:id',deletestudent)

// router.put('/updatestudent/:id')


export default router
 