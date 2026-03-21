import mongoose from "mongoose";


const SchoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    classes: {
        type: Number,
        required: true
    },
    schoolLogo: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Schoolmodel = mongoose.model("School", SchoolSchema)
export default Schoolmodel