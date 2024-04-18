import { Server } from "socket.io";
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000"],
        methods: ['GET', 'POST'],
    }
})

export const getRecieverScoketId = (recieverId)=>{
    return usersocketMap[recieverId];
}

const usersocketMap = {}; //userId :socket.id

 io.on("connection",(socket)=>{
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if(userId != "undefined") usersocketMap[userId] = socket.id;
    //io emit is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(usersocketMap))

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);
        delete usersocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(usersocketMap))

    });
    
})

export{app, io ,server}