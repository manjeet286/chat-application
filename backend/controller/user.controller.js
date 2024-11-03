
import { ApiError  } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../models/user.model.js";
export const getUserForSidebar= async(req,res)=>{
      try {
           const loggedInUser= req.user._id;
           const filtereduser= await User.find({_id: {$ne:loggedInUser}}).select("-password")
          return res.status(200)
           .json( new Apiresponse(200, filtereduser))

        
      } catch (error) {
           throw new ApiError("Error 501 in the getting the user ",error.message)
      }

      
}