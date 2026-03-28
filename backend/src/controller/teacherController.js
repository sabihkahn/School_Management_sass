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
        
        if(!teachers || teachers.length == 0){
            return res.status(400).send({message:"cant find any teacher"})
        }
        res.status(200).send(teachers)
        
    } catch (error) {
        console.log("Error in getAllTeachers controller ==> ",error)
        res.status(500).send({message:"Internal server error "})
    }
}

export const updateTeacher = async (req,res) => {
    try {
        const schooldid = req.userid
        const  {name,email,phoneNumber,degree,image,Salary,subject} = req.body
        const teacherid = req.params.teacherid
        const teacher = await TeacherModel.findByIdAndUpdate({_id:teacherid,SchoolID:schooldid},{name,email,phoneNumber,degree,image,Salary,subject})
        
       if(!teacher || teacher.length == 0){
            return res.status(400).send({message:"cant find any teacher"})
        }
        
        res.status(200).send({message:"Teacher updated successfully"})
        

    } catch (error) {
        console.log("Error in updateTeacher controller ",error)
        res.status(500).send({message:"internal server error "})
    }
}

export const deleteTeacher = async (req,res) => {
    try {
        
        const teacherid = req.params.teacherid
        const id = req.userid

        const teacher = await TeacherModel.findOneAndDelete({_id:teacherid,SchoolID:id})
        if(!teacher || teacher.length == 0){
            return res.status(400).send({message:"cant find any teacher"})
        }

        res.status(200).send({message:"Teacher deleated successfully"})


    } catch (error) {
        console.log("error occur in teacher Controller")
    }
}

export const searchTeacherByname = async (req,res) => {
    try {
        const id = req.userid
        const name = req.query.name

        if(!name){
            return res.status(400).send({message:"name is required for searching"})

        }
        
        
    const teachers = await TeacherModel.find({
    
        name:{$regex:name,$options: 'i' },
        SchoolID:id
        
    })
        
    if(!teachers || teachers.length == 0){
     return res.status(400).send({message:"cant find any teacher with this name "}) 
    }

    res.status(200).send(teachers)


    } catch (error) {
        console.log("error occur in searchTeacherByname ==> ",error)
        res.status(500).send({message:"Internal server error"})
    }
}