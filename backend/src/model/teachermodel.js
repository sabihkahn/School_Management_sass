import mongoose  from "mongoose";


const teachermodel = new mongoose.Schema(
        {
            SchoolID:{type:mongoose.Schema.ObjectId,ref:"School"},
            name:{type:String,required:true},
            email:{type:String,required:true},
            phoneNumber:{type:Number,required:true},
            degree:{type:String,required:true},
            image:{type:String,required:true},
            Salary:{type:Number,required:true},
            subject:{type:String,required:true}
        }



,{ timestamps: true })

const TeacherModel = mongoose.model("Teacher",teachermodel)
export default TeacherModel