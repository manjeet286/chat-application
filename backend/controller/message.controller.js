import Conversation from "../models/conservation.model.js";
import Message from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage= async(req,res)=>{
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
  
        let conversation = await Conversation.findOne({
           participants: { $all: [senderId, receiverId] },
        });
  
        if (!conversation) {
           conversation = await Conversation.create({
              participants: [senderId, receiverId],
           });
        }
  
        const newMessage = new Message({
           senderId,
           receiverId,
           message,
        });
  
        await newMessage.save(); // Save the new message
  
        if (newMessage) {
           conversation.messages.push(newMessage._id);
           await conversation.save(); // Save the conversation with the new message ID
        }

  
        res.status(201).json({
           success: true,
           message: 'Message sent successfully',
           data: newMessage
        });
     } catch (error) {
        console.error("Error in sendMessage:", error);
        throw new ApiError(400, "Internal server error");
     }
}
export const getMessage= async(req,res)=>{
   try {
       
       const { id: userToChatId } = req.params;
       const senderId = req.user._id;
 
       let conversation = await Conversation.findOne({
          participants:{ $all:[senderId ,userToChatId]}
       }).populate("messages");
 
       
 
       
 
     
       
 
       res.status(200).json(
            conversation.messages
              
       );
    } catch (error) {
       console.error("Error in get message controoller:", error.message);
       throw new ApiError(400, "Internal server error");
    }
}