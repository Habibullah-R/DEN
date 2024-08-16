import asyncHandler from "../utills/AsyncHandler.js"
import ApiError from "../utills/ApiError.js"
import User from "../models/user.model.js"
import uploadFile from '../utills/cloudinary.js'
import ApiResponse from "../utills/ApiResponse.js"

const options = {
    httpOnly : true,
    secure:true
}

export const signup = asyncHandler(async (req,res)=>{
    const { username , email , password , avatar} = req.body;

    if(!username || !email || !password){
        throw new ApiError(400,"All fields are required");
    }

    if(password.length <8){
        throw new ApiError(400,"Password must be 8 characters long");
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        throw new ApiError(409,"User already exist.")
    }

    const avatarLocalPath = req.file?.path;

    const uploadAvatar = await uploadFile(avatarLocalPath); 

    const user = await User.create({
        username,
        email,
        password,
        avatar: uploadAvatar?.url
    })

    const newUser = await User.findOne(user._id).select("-password");

    if(!newUser){
        throw new ApiError(500,"Something went wrong while creating user.")
    }

    return res.status(201).json(
        new ApiResponse(200,newUser,"User created successfully.")
    )
})


export const login = asyncHandler( async (req,res)=>{
    const { email , password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"All fields required.");
    }

    const existedUser = await User.findOne({email});

    if(!existedUser){
        throw new ApiError(401,"User does not exist")
    }

    const isValidPass = await existedUser.isPasswordCorrect(password); 

    if(!isValidPass){
        throw new ApiError(401,"Invalid user credentials");
    }

    const token = await existedUser.generateAccessToken(existedUser._id , email)

    if(!token){
        throw new ApiError(500,"Something went wrong while generating access token");
    }

    const { password : pass , ...resUser } = existedUser._doc;

    return res.status(201)
    .cookie("blog_app_cookie",token , options)
    .json(
        new ApiResponse(200,{user:resUser , token},"User logged in successfully.")
    )
})


export const logout = asyncHandler( async (req,res)=>{
    return res.status(200)
    .clearCookie("blog_app_cookie")
    .json(
        new ApiResponse(200,{},"User logout successfully")
    )
})

export const deleteUser = asyncHandler( async (req,res)=>{
    await User.findByIdAndDelete(req.user?._id);
    return res.status(200)
    .clearCookie("blog_app_cookie")
    .json(
        new ApiResponse(200,{},"User deleted successfully")
    )
})


export const updateCredentials = asyncHandler(async(req,res)=>{
    const { username , email} = req.body;
    if(!username || !email ){
        throw new ApiError(400,"All fields are required");
    }
    const updatedUser = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                username,
                email
            }
        },{
            new:true
        }
    ).select("-password");
    return res.status(201).json(
        new ApiResponse(200,{user:updatedUser},"User details updated successfully.")
    )
})


export const updateAvatar = asyncHandler(async (req,res)=>{
    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required.");
    }

    const uploadedFile = await uploadFile(avatarLocalPath);

    if(!uploadedFile){
        throw new ApiError(500,"Something went wrong while uploading avatar.");
    }

    const updatedUser = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                avatar:uploadedFile.url
            }
        },{
            new:true
        }
    )
    return res.status(201).json(
        new ApiResponse(200,{user:updatedUser},"Avatar updated successfully.")
    )
})


export const updatePassword = asyncHandler(async(req,res)=>{
    const { oldPassword , newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new ApiError(400,"All fields are required.");
    }

    const existedUser = await User.findById(req.user?._id);

    const checkPass = await existedUser.isPasswordCorrect(oldPassword);

    if(!checkPass){
        throw new ApiError(401,"old password is incorrect.");
    }

    existedUser.password = newPassword;
    existedUser.save({validateBeforeSave:false});

    return res.status(201).json(
        new ApiResponse(200,{},"Password updated successfully.")
    )
})
