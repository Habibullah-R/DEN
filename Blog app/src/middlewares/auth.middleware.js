import jwt from "jsonwebtoken";
import ApiError from "../utills/ApiError.js";
import asyncHabdler from "../utills/AsyncHandler.js";
import User from "../models/user.model.js"

const authorizeToken = asyncHabdler(async(req,res,next)=>{
    const token = req.cookies.blog_app_cookie || req.headers.authorization?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized access");
    }

    const decodedUser = jwt.verify(token,process.env.JWTSecret);
    const user = await User.findById(decodedUser._id).select("-password");


    if(!user){
        throw new ApiError(401,"Invalid access");
    }
    req.user = user;
    next();
})

export default authorizeToken;