import express from 'express'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cookieparser from 'cookie-parser'

const app = express()


// middleware

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

// Routes

app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
  
    res.status(200).send({message:"server running successfully"})
})



app.listen(4000,()=>{
    connectDB()
    console.log("server is running on port 4000 http://localhost:4000")
})