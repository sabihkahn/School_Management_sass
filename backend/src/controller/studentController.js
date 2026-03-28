import Studentmodel from "../model/studentmodel.js";

export const createStudent = async (req, res) => {
    try {
        let { name, email, classin, fatherName, motherName, lastPaidDate, coarse, image, parentsNumber } = req.body;

        // 1. Validation
        if (!name || !email || !classin || !fatherName || !motherName || !lastPaidDate || !coarse || !image || !parentsNumber) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // 2. Date Formatting
        const formattedDate = new Date(lastPaidDate);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).send({ message: "Invalid date format for lastPaidDate" });
        }

        const id = req.userid;

        // 3. Create and Save
        const student = new Studentmodel({
            name,
            email,
            classin,
            fatherName,
            motherName,
            lastPaidDate: formattedDate,
            coarse,
            image,
            parentsNumber,
            SchoolID: id
        });

        await student.save();
        res.status(201).send({ message: "Student created successfully", student });

    } catch (error) {
        console.error("Error in student controller:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export const getallstudents = async (req, res) => {
    try {
        const id = req.userid

        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        if (!page || !limit) {
            console.log("Nothing provided for limit and page ")
            return res.status(400).send({ message: "cant get students" })

        }

        const students = await Studentmodel.find({ SchoolID: id }).skip(skip).limit(limit)
        if (!students) {
            return res.status(400).send({ message: "no sudent found" })
        }
        res.status(200).send(students)



    } catch (error) {
        console.log("error occur in get allstudent controller : ==> ", error)
        res.status(500).send({ message: "internal server error" })
    }

}


export const getAllunpaidstudents = async (req, res) => {
    try {
        const id = req.userid

        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const now = new Date()
        // Fetch students from database
        const students = await Studentmodel.find({ SchoolID: id }).skip(skip).limit(limit);

        if (!students || students.length === 0) {
            return res.status(404).send({ message: "No students found" });
        }

        const unpaidStudents = students.filter((student) => {
            const lastPaid = new Date(student.lastPaidDate);

            // Calculate when the 30-day period ends
            const expiryDate = new Date(lastPaid);
            expiryDate.setDate(expiryDate.getDate() + 30);

            // If expiryDate is LESS than right now, they are unpaid (expired)
            return expiryDate < now;
        });
      
        if (!unpaidStudents || unpaidStudents.length == 0) {
            return res.status(400).send({ message: "no unpaid student found" })
        }

        res.status(200).send(unpaidStudents)
    } catch (error) {
        console.log("error occur in getallunpaidstudents controlller", error)
        res.status(500).send({ message: "internal Server error" })
    }
}
export const getallstudentsbyclassname = async (req, res) => {
    try {
        const id = req.userid

        const { page = 1, limit = 10, classin } = req.query;
        const skip = (page - 1) * limit;

        if (!page || !limit) {
            console.log("Nothing provided for limit and page ")
            return res.status(400).send({ message: "cant get students" })

        }

        const students = await Studentmodel.find({ SchoolID: id, classin: classin }).skip(skip).limit(limit)
        if (!students || students.length == 0) {
            return res.status(400).send({ message: "no sudent found" })
        }
        res.status(200).send(students)



    } catch (error) {
        console.log("error occur in get allstudent controller : ==> ", error)
        res.status(500).send({ message: "internal server error" })
    }

}




export const getAllunpaidstudentsbyclassname = async (req, res) => {
    try {
        const id = req.userid

        const { page = 1, limit = 10, classin } = req.query;
        const skip = (page - 1) * limit;
        const now = new Date()
        // Fetch students from database
        const students = await Studentmodel.find({ SchoolID: id, classin: classin }).skip(skip).limit(limit);

        if (!students || students.length === 0) {
            return res.status(404).send({ message: "No students found" });
        }

        const unpaidStudents = students.filter((student) => {
            const lastPaid = new Date(student.lastPaidDate);

            // Calculate when the 30-day period ends
            const expiryDate = new Date(lastPaid);
            expiryDate.setDate(expiryDate.getDate() + 30);

            // If expiryDate is LESS than right now, they are unpaid (expired)
            return expiryDate < now;
        });

        if (unpaidStudents.length == 0) {
            return res.status(400).send({ message: "no unpaid student found" })
        }

        res.status(200).send(unpaidStudents)
    } catch (error) {
        console.log("error occur in getallunpaidstudents controlller", error)
        res.status(500).send({ message: "internal Server error" })
    }
}

export const deletestudent = async (req, res) => {
    try {
        const studentId = req.params.id

        if (!studentId) {
            return res.status(400).send({ message: "student id is required" })
        }

        const student = await Studentmodel.findByIdAndDelete(studentId)

        if (!student) {
            return res.status(400).send({ message: "can't find student to delete" })
        }

        res.status(200).send({ message: "student deleted successfully" })



    } catch (err) {

        console.log("an error occur in deletestudent : ==> ", err)
        res.status(500).send({ message: "Internal server error" })

    }
}


export const updateStudent = async (req,res) => {
    try {

        const id = req.params.id
        let { name, email, classin, fatherName, motherName, lastPaidDate, coarse, image, parentsNumber } = req.body;
        
        const student = await Studentmodel.findByIdAndUpdate(id,{ name, email, classin, fatherName, motherName, lastPaidDate, coarse, image, parentsNumber })
        if(!student){
            return res.status(400).send({message:" can't find student "})
        }
        res.status(200).send({message:"Student updated successfull"})

    } catch (error) {

        console.log("an error occur in updatestudent controller ==> ",error)
        res.status(500).send({message:"Internal server error"})

    }
}


export const setstudentpaid = async (req,res) => {
    try {
        const id = req.params.id

        let lastPaidDate = new Date()
         const formattedDate = new Date(lastPaidDate);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).send({ message: "Invalid date format for lastPaidDate" });
        }

        const student = await Studentmodel.findByIdAndUpdate(id,{lastPaidDate:formattedDate})
         if(!student){
            return res.status(400).send({message:"student not found"})
         }

        res.status(200).send({message:"student fees has updated"})

    } catch (error) {
          console.log("an error occur in setstudentpaid controller ==> ",error)
        res.status(500).send({message:"Internal server error"})
    }
}


export const allStudentscount = async (req,res) => {
  try {
    const id1 = req.userid 
    const allstudents = await Studentmodel.countDocuments({
      SchoolID: id1
    });

    res.status(200).send({TotalStudentCount:allstudents})
  } catch (error) {
    console.log("error in allStudents controller ",error)
    res.status(500).send({message:" Internal server error "})
  }
}



