import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const allUsers = await User.find({_id:{$ne : loggedInUser}}).select("-password"); // this $ne and id logic is used for excluding logged user

        res.status(200).json(allUsers);
        
    } catch (error) {
        console.log("getUsersForSidebar controller error",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}