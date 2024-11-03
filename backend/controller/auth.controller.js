
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
const generateAccessTokenAndRefreshToken=async(userId)=>{
     try {
          const user=  await User.findById(userId)
          const accessToken=  await user.generateAccessToken()
          const refreshToken=  await user.generateRefreshToken()
          user.refreshToken=refreshToken,
          user.save({validateBeforeSave:false})
          return {accessToken ,refreshToken}
     } catch (error) {
          throw new ApiError(500, "Something went wrong when generating  access and refresh Token")
     }
}
const Signup= asyncHandler(async(req ,res)=>{
     const {fullname, email, username, password} = req.body
     if(
         [fullname ,email, username, password].some((field)=>field?.trim() === "")
         
     )
     {
         throw new ApiError(400 ,"all fields adre compulsory")
   }
     const ExistedUser= await User.findOne({
        $or: [ {email},{ username}
 
        ]})
     if(ExistedUser)
     {
           throw new ApiError(400 ,"User already exits")
 
     }
   
     
     const user= await User.create({
          fullname, 
          username,
          email,
          password,
        
         
 
     })
     const createdUser= await User.findById(user._id).select("-password  -refreshToken")
     if(!createdUser)
     {
           throw new ApiError(400 ,"Something went wrong");
     }
     return res.status(201).json(
          new Apiresponse(200 , createdUser , "User registeres Successfully")
     )
 
 })
 const loginUser= asyncHandler(async(req,res)=>{
     const {email, username, password}= req.body
     if(!username && !email)
     {
        throw new ApiError(400, "Username   or email required")
     }
     const user= await User.findOne({
       $or:[{username} , {email}]
     })
     if(!user)
     {
        throw new ApiError(400, "user does not exits");
     }
     const isPasswordCorrect= await user.isPasswordCorrect(password)
     if(!isPasswordCorrect)
     {
        throw new ApiError(400, " password is incorrect")
     }
     const {accessToken , refreshToken}= await generateAccessTokenAndRefreshToken(user._id)
     const loggedinUser = await User.findById(user._id).select("-password -refreshToken");

     const options={
       httpOnly:true,
       secure:true,
     }
     return res.status(200)
     .cookie("accessToken" , accessToken, options)
     .cookie("refreshToken" , refreshToken, options)
     .json(
        new Apiresponse(
            
           200,
           {
                    user:loggedinUser, accessToken, refreshToken
        }
       , "User Logged in Successfully"
   )
     )
})
const logOutUser = asyncHandler(async (req, res) => {
  
   const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    User.findByIdAndDelete(
         req.user._id,
         {  $unset:{
          refreshToken: 1
         },
        
        
    },
    {
     new:true
   },
      


)
  const options={
     httpOnly:true,
     secure:true
  }
   return res
   .status(200)
   .clearCookie("accessToken" , options)
   .clearCookie("refreshToken" , options)
   .json( new Apiresponse(200 ,{} ,"User logged out") )
  
     
 });
export {
     generateAccessTokenAndRefreshToken,Signup,
     logOutUser,
     loginUser
}

