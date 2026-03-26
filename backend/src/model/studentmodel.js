import mongoose  from "mongoose";


const StudentSchema = new mongoose.Schema(
        {
            SchoolID:{type:mongoose.Schema.ObjectId,ref:"School"},
            name:{type:String,required:true},
            email:{type:String,required:true},
            classin:{type:Number,required:true},
            fatherName:{type:String,required:true},
            motherName:{type:String,required:true},
            lastPaidDate: {type: Date,default: null},
            coarse:{type:String,required:true},
            image:{type:String,required:true},
            parentsNumber:{type:Number,required:true}
        }



,{ timestamps: true })

StudentSchema.index({ SchoolID: 1, class: 1 });

const Studentmodel = mongoose.model("Student",StudentSchema)
export default Studentmodel