import asyncHandler from "../utills/AsyncHandler.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utills/ApiResponse.js";
import { getReceiverSocketId ,io } from "../app.js";

export const sendMessage = asyncHandler(async(req,res)=>{
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user?._id;

    let conversation= await Conversation.findOne({
        participants:{$all:[recieverId,senderId]}
    })

    if(!conversation){
        conversation = new Conversation({
            participants : [recieverId, senderId]
        }) 
    }

    const newMessage = new Message({
        senderId,
        recieverId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(),newMessage.save()])


    const receiverSocketId = getReceiverSocketId(recieverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        else{
            console.log("No socket id")
        }

    return res.status(200).json(
        new ApiResponse(200,newMessage,"Message send Successfully")
    )
})

export const getMessages = asyncHandler(async(req,res)=>{
    const { id : userToChatWith} = req.params;
    const senderId = req.user?._id;

    const conversation = await Conversation.findOne({
        participants:{$all:[senderId , userToChatWith]}
    }).populate("messages")

    if(!conversation){
        return res.status(200).json(
            new ApiResponse(200,[],"No conversation.")
        )
    }

    const messages = conversation.messages;

    return res.status(200).json(
        new ApiResponse(200,messages,"Conversation Fetched.")
    )

})