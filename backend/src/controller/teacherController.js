import TeacherModel from "../model/teachermodel.js"


export const createTeacher = async (req,res) => {
    try {

        const id = req.userid
        
      const {name,email,phoneNumber,degree,image,Salary,subject} = req.body
      if(!name || !email || !phoneNumber || !degree || !image || !Salary || !subject){
        return res.status(400).send({message:"all fields are required"})
      }
      const teacher = await TeacherModel.create({name,email,phoneNumber,degree,image,Salary,subject,SchoolID:id})
      
      
       return res.status(200).send({message:"teacher created successfully"})
    } catch (error) {
        console.log("error occur in createTeacher controller",error)
    }
}

export const getAllTeachers = async(req,res) =>{
    try {

        const id = req.userid

        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        if (!page || !limit) {
            console.log("Nothing provided for limit and page ")
            return res.status(400).send({ message: "cant get students" })

        }

        const teachers = await TeacherModel.find({ SchoolID: id }).skip(skip).limit(limit)
        
        if (!teachers) {
            return res.status(400).send({ message: "no teachers found" })
        }

        res.status(200).send(teachers)
        
    } catch (error) {
        console.log("Error in getAllTeachers controller ==> ",error)
    }
}