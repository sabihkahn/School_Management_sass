import mongoose from "mongoose";
import Schoolmodel from "../model/schoolschema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { genJwt } from "../libs/genrateToken.js";


export const Register = async (req, res) => {
  try {
    let { schoolName, address, classes, schoolLogo, email, password } = req.body;

  if (schoolName.length > 50) return res.status(400).send({ message: "School name too long" });
if (address.length > 100) return res.status(400).send({ message: "Address too long" });
 if (typeof classes !== "number" || isNaN(classes)) {
  return res.status(400).send({ message: "Classes must be a valid number" });
}
    // Trim all string fields
    schoolName = schoolName?.trim();
    address = address?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();
    schoolLogo = schoolLogo?.trim();

    let user = await Schoolmodel.findOne({ email })
    if (user) {
      return res.status(400).send({ message: "user already exist" })
    }

    // Check required fields
    if (!schoolName || !address || !classes || !schoolLogo || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate schoolName
    if (schoolName.length < 3) {
      return res.status(400).json({ message: "School name must be at least 3 characters long" });
    }

    // Validate address
    if (address.length < 5) {
      return res.status(400).json({ message: "Address must be at least 5 characters long" });
    }

    // Validate the array braah
    if (classes.length === 0) {
      return res.status(400).json({ message: "Classes must be a non-empty array" });
    }

    // Validate password
    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({
        message: "Password must be between 8 and 12 characters",
      });
    }

    // Strong password  hard regex to understand work 100 percemt
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one letter and one number",
      });
    }

    // Email validation hard regex work 100 percent 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate schoolLogo (basic URL check)
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(schoolLogo)) {
      return res.status(400).json({ message: "Invalid school logo URL" });
    }
    const hashedpass = await bcrypt.hash(password, 7)

    const schooldata = new Schoolmodel({
      schoolName, address, classes, schoolLogo, email, password: hashedpass
    })
    await schooldata.save()
    const userid  =  schooldata._id
    const token  =  genJwt(userid)
    
    
      res.cookie("jwt",token,{
        httpOnly: true,
  maxAge: 90000000,
  sameSite: 'lax', // not 'strict'
  secure: false
    })

    return res.status(200).json({
      message: "User created successfully", schooldata: {
        schoolName: schooldata.schoolName,
        email: schooldata.email,
        schoolLogo: schooldata.schoolLogo,
        address: schooldata.address,
        id: schooldata._id
      }
    });

  } catch (error) {
    console.log("Error occur in Register controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async(req,res)=>{
  try {

    const {email,password} = req.body

    if(!email || !password){
      return res.status(400).send({message:"all fields are required "})
    }
    
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one letter and one number",
      });
    }

    // Email validation hard regex work 100 percent 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const schooldata  = await Schoolmodel.findOne({email})

    if(!schooldata){
      return res.status(400).send({message:"this school does't exist"})
    }
    if (!schooldata.password) {
  return res.status(400).send({ message: "Password not set. Please reset password." });
}

    const isPasswordMached =await bcrypt.compare(password,schooldata.password)

    if(!isPasswordMached){
      return res.status(400).send({message:"Invalid password"})
    }

        const userid  =  schooldata._id
        const token  =  genJwt(userid)
    

      res.cookie("jwt",token,{
       httpOnly: true,
  maxAge: 90000000,
  sameSite: 'lax', // not 'strict'
  secure: false
    })


     return res.status(200).json({
      message: "logined successfully",
      schooldata: {
        schoolName: schooldata.schoolName,
        email: schooldata.email,
        schoolLogo: schooldata.schoolLogo,
        address: schooldata.address,
        id: schooldata._id
      }
    });
    
  } catch (error) {
    console.log("error in login controller: ",error)
    res.status(500).send({message:"internal server error"})
  }
}

export const check = async(req,res)=>{
  try {

    const id = req.userid
    if(!id){
      return res.status(400).send({message:"id is not provided"})
    }
    const schooldata = await Schoolmodel.findById(id).select("-password")
    res.status(200).send({message:"validation complete ",schooldata})

    
  } catch (error) {
    console.log("error in check controllerr in authController ",error)
    res.status(500).send({message:"Internal server error"})
  }
}

export const update = async (req, res) => {
  try {
    const { schoolName, password } = req.body;
    const id = req.userid;

      // Validate password
    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({
        message: "Password must be between 8 and 12 characters",
      });
    }

    // Strong password  hard regex to understand work 100 percemt
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one letter and one number",
      });
    }

  

    let updateFields = {};

    if (schoolName) {
      updateFields.schoolName = schoolName;
    }

    if (password) {
      updateFields.password = await bcrypt.hash(password, 7);
    }

    const schooldata = await Schoolmodel.findByIdAndUpdate(
      id,
      { $set: updateFields },
     { returnDocument: 'after' }
    );

    if (!schooldata) {
      return res.status(400).send({ message: "No user found" });
    }


    res.status(200).send({
      message: "updated successfully",
      schooldata,
    });

  } catch (error) {
    console.log("error occur in update controller", error);
    res.status(500).send("Internal server error");
  }
};


export const logout  = async (req,res) =>{
try {
  
res.cookie("jwt", "", { 
      httpOnly: true, 
      expires: new Date(0),
      sameSite: "strict" 
    });

    
    return res.status(200).json({ message: "Logged out successfully" });

} catch (error) {

  console.log("error")
  res.status(500).send({message:"Internal server error"})

}
}