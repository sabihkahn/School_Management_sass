import express from 'express'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieparser from 'cookie-parser'
import studentroutes from './routes/studentRoutes.js'
import teacherRoutes from './routes/teacherRouters.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import {rateLimit} from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
  windowMs:  7 * 60 * 1000, // in every 5 minutes 100 req can be fired
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all requests
app.use(limiter);

// middleware

app.use(cookieparser())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

// Routes

app.use('/api/auth',authRoutes)
app.use('/api',studentroutes)
app.use('/api',teacherRoutes)
app.use('/api',dashboardRoutes)


app.get('/',(req,res)=>{
  
    res.status(200).send({message:"server running successfully"})
})



app.listen(4000,()=>{
    connectDB()
    console.log("server is running on port 4000 http://localhost:4000")
})