import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverScoketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversations = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]},
        })
        if(!conversations){
            conversations = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

            const newMessage = new Message({
                senderId,
                receiverId,
                message,
            })
            if(newMessage){
                conversations.messages.push(newMessage._id);
            }
            //this will take time as it will run when one conmpleted
            // await conversations.save();
            // await newMessage.save(); 

            await Promise.all([conversations.save(), newMessage.save()]); // this will run in parallel

            //socket functionality
            const recieverSocketId = getRecieverScoketId(receiverId);

            if(recieverSocketId){
             io.to(recieverSocketId).emit("newMessage", newMessage);
            }

            return res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("sendMessage controller error", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessage = async(req,res) =>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user.id;
        

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId , userToChatId]},
        }).populate("messages"); // not a reference but actual messages;
        
    
        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);

        
    } catch (error) {
        console.log("getMessage controller error", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}