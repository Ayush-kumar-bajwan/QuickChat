import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import genTokenAndSetCookie from "../utils/genToken.js";

/*signup*/

export const signup = async (req,res)=>{
    try {
        const {fullname, username , gender , password ,confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "passwords don't match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: "username already exists"});
        }
        /*hash password will be here*/
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male"? boyprofilePic : girlprofilePic,
        })

        if(newUser){
            //generate token here
            genTokenAndSetCookie(newUser._id, res);
            await newUser.save()
            res.status(201).json({
            _id : newUser._id,
            fullname : newUser.fullname,
            username : newUser.fullname,
            profilePic : newUser.profilePic,
        })
        }
        else{
            res.status(400).json({error: "error signin up"});
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error: "Interval error occured"})
    }
    console.log("signup page");
}
//login
export const login = async(req,res)=>{
   try {
    const {username, password} = req.body;

    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

    if( !user || !isPasswordCorrect){
       return res.status(400).json({error: "invalid username or password"});
    }

    genTokenAndSetCookie(user._id , res);
    
    res.status(200).json({
        _id : user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic : user.profilePic,
    });

    
   } catch (error) {
    console.log("login controller error", error.message);
    res.status(500).json({error: "internal server error"})
   }
}

//logout
export const logout = (req,res)=>{
    try {
        res.cookie("jwt", "",{maxAge:0});
        res.status(200).json({message: "logged out succesfully"});
        
    } catch (error) {
        console.log("logout controller error", error.message);
        res.status(500).json({error: "internal server error"});
    }
}