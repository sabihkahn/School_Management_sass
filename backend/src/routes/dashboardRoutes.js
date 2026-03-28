import express from 'express'
import {Authorization} from '../middleware/AuthMiddleware.js' 
import { Dashboardcontroller } from '../controller/dashboardcontroller.js'
const router = express.Router()


router.get('/dashboradData',Authorization,Dashboardcontroller)


export default router