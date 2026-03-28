import Schoolmodel from '../model/schoolschema.js'
import Studentmodel from '../model/studentmodel.js'
import TeacherModel from '../model/teachermodel.js'

export const Dashboardcontroller = async (req, res) => {
    try {

        const schoolid = req.userid

        const totalStudents = await Studentmodel.countDocuments({ SchoolID: schoolid })
        const totalTeacher = await TeacherModel.countDocuments({ SchoolID: schoolid })
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const paidCount = await Studentmodel.countDocuments({
            SchoolID: schoolid,
            lastPaidDate: { $gt: thirtyDaysAgo }
        });
        const unpaidStudets  = totalStudents - paidCount
        const schooldata = await Schoolmodel.findById(schoolid).select("-password")
        
        res.status(200).send({totalStudents,totalTeacher,unpaidStudets,paidCount,schooldata})

    } catch (error) {
        console.log("error occur in Dashboard controller ",error)
        res.status(500).send({ message: "Internal server error" })
    }


}