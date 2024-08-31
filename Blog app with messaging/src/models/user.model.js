import { Schema , model } from "mongoose";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username : {
        type: String,
        required:true,
        lowercase:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"http://res.cloudinary.com/dzc5azhvc/image/upload/v1723821153/nlkphc5nejnfjpgqe4mf.png"
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))  return next();

    this.password = await bcryptjs.hash(this.password,10)
    return next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email:this._email
    },
    process.env.JWTSecret,
    {
        expiresIn:process.env.JWTExpiresIn
    }
    )
}

const User = model('User',userSchema);

export default User;