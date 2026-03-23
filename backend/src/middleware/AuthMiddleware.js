import jwt from 'jsonwebtoken'

export const Authorization = (req, res, next) => {
  try {
    const token = req.cookies?.jwt
   
    if (!token) {
      return res.status(401).json({ message: "No token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_Secret)
    if(!decoded.userid){
      return res.status(400).send({message:"token expired"})
    }
    req.userid = decoded.userid

    next()

  } catch (error) {
    console.log("an error occur in authmiddleware ",error)
    return res.status(401).json({ message: "Invalid token" })
  }
}