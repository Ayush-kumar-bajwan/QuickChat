import jwt from "jsonwebtoken";

const genTokenAndSetCookie = (userId , res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "15d",
    })
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //duration
        httpOnly: true, //preven xss, cross-site attack as user cant acces it via javascript now
        sameSite : "strict", //prevent CSRF attacks cross-site request forgery attacks
        secure : process.env.NODE_ENV !== "development",
    })
}

export default genTokenAndSetCookie;