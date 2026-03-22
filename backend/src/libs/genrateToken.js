import jwt from 'jsonwebtoken'

export const genJwt = (userid) =>{
    try {
        if(!userid){
            throw new Error("id is required in jwt function genjwt in genatetoken in libs check all the files where u=yiu use hte jwt to incsure that it dot have any missing parameter")
        }

        const token = jwt.sign({userid},process.env.JWT_Secret,{ expiresIn: '7d' })
        return token

        
    } catch (error) {
        console.log("error",error);
        
    }

}