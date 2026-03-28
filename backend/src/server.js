import express from 'express'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieparser from 'cookie-parser'
import studentroutes from './routes/studentRoutes.js'
import teacherRoutes from './routes/teacherRouters.js'
const app = express()


// middleware

app.use(cookieparser())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

// Routes

app.use('/api/auth',authRoutes)
app.use('/api',studentroutes)
app.use('/api',teacherRoutes)

app.get('/',(req,res)=>{
  
    res.status(200).send({message:"server running successfully"})
})



app.listen(4000,()=>{
    connectDB()
    console.log("server is running on port 4000 http://localhost:4000")
})