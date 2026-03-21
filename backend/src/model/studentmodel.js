import mongoose  from "mongoose";


const SchoolSchema = new mongoose.Schema(
        {
            SchoolID:{type:mongoose.Schema.ObjectId,ref:"School"},
            name:{type:String,required:true},
            email:{type:String,required:true},
            class:{type:Number,required:true},
            fatherName:{type:String,required:true},
            motherName:{type:String,required:true},
            lastPaidDate: {type: Date,default: null},
            coarse:{type:String,required:true},
            image:{type:String,required:true},
            parentsNumber:{type:Number,required:true}
        }



,{ timestamps: true })

const Studentmodel = mongoose.model("School",SchoolSchema)
export default Studentmodel