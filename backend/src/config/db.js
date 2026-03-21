import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.Mongoose_URI).then(() => {
            console.log("Mongodb connected successfully")
        }).catch((err) => {
            console.log("an error occur while connecting", err)
        })
    } catch (error) {
        console.log("error", error);

    }
}