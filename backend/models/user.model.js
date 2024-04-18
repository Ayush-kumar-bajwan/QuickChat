import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type : String,
        required: true,
        unique : true,
    },
    gender:{
        type: String,
        enum : ["male", "female"],
    },
    password:{
        type:String,
        required:true,
        minlength : 6,
    },

    profilePic:{
        type: String,
        default: "",
    },
},{timestamps: true})
 const User  = mongoose.model("User-data", userSchema);
 export default User;