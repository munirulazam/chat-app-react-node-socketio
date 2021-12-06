const express = require('express')
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");

app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});



io.on("connection", (socket) =>{
    console.log(`User connected: ${socket.id}`);


    socket.on("join_room", (data) =>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined our room: ${data}!`)
    })

    socket.on("send_message", (data) =>{
        socket.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnet", () =>{
        console.log(" User disconnected" + socket.id);
    })
})


const PORT = 3001




server.listen(PORT, (err, result) =>{
    if(err){
        console.log(err)
    }
    else{
        console.log("server running at port:" + PORT);
    }
})