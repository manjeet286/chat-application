import mongoose ,{Schema} from "mongoose";
const conversationSchema=  new mongoose.Schema({
       participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
       ]  
    , messages:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:"Message",
             default:[],
        }
    ]

}, {timestamps:true})
const Conversation =mongoose.model("Coversation" ,conversationSchema);
export default Conversation