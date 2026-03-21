import mongoose from "mongoose";
import Schoolmodel from "../model/schoolschema.js";
import bcrypt from 'bcrypt'
export const Register = async (req, res) => {
  try {
    let { schoolName, address, classes, schoolLogo, email, password } = req.body;

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