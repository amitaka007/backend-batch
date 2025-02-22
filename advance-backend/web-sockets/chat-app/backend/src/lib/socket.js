import {Server} from "socket.io";
import http from "http";
import express from "express";


const app = express();


const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

const userSocketMap = {}; // {userId:{socketId:socketId , isTyping:isTyping}}

io.on("connection" , (socket)=>{
    console.log("User connected" , socket.id);

    const userId = socket.handshake.query.userId;
    const isTyping = socket.handshake.query.isTyping;

    if(userId)  userSocketMap[userId] = {socketId:socket.id , isTyping:isTyping};

    // io.emit() is used to send event to all the connected client;
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))
   

    socket.on("disconnect" , ()=>{
        console.log("User disconnected" , socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    })
})

export {app , server , io};