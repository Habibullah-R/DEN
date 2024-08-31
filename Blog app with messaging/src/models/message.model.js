import { Schema , model } from "mongoose";


const messageSchema = new Schema({
    recieverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message = new model("Message",messageSchema);

export default Message;