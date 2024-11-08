import mongoose ,{Schema} from "mongoose";
import  bcrypt from  "bcryptjs"
import jwt from "jsonwebtoken"
const UserSchema= new Schema({
    username:{
        type:String ,
        required:true,
        index:true,
        lowercase:true,
        trim:true,
  },
  password:{
    type:String,
    required:[true ,"Password is Required"]

  },
 
  fullname:{
    type:String ,
    required:true,
    index:true,
   
    trim:true,
},
email:{
type:String ,
required:true,
unique:true,
lowercase:true,
trime:true,
},



refreshToken:{
    type:String,
}
},{timestamps:true})
UserSchema.pre("save" , async function (next) {
    if(!this.isModified("password"))
    {
         return next();
    }
    this.password=await  bcrypt.hash(this.password,10);
    next();
    
})
UserSchema.methods.isPasswordCorrect=async function (password) {
    return bcrypt.compare(password ,this.password)
    
}
UserSchema.methods.generateAccessToken=async function (){
    return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
           
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken= async function () {
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export  const User=  mongoose.model("User" , UserSchema);