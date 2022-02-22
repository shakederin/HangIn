const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const {Server} = require("socket.io")
const http = require("http");
const {createServer} = require("http");
require("dotenv").config();
const { addUser, deleteUser } = require("./control/users");
// const io = require("socket.io");
const app = express()
const server = http.createServer(app);
const io = new Server(server)
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://'}));

// app.post("/login", firstDoor);
app.post("/user/add", addUser);
app.post("/user/delete", deleteUser);




const allUsersObj = []
io.on("connection", (socket)=>{
    console.log(socket.id, "connected");
    socket.on("setUserName", (userName)=>{
        const userObj = {id: socket.id, userName}
        allUsersObj.push(userObj)
        socket.emit("getID", (userObj))
    })
    socket.on("newUserLogin", ()=>{
        allUsersObj.push(socket.id)
        console.log(allUsersObj);
        socket.broadcast.emit("newUserLogin")
    })
    socket.on("sendMessage", (msgObj)=>{
        console.log(msgObj);
        io.emit("getNewMsg", msgObj)
    })
    socket.on("disconnect", ()=>{
        allUsersObj.splice(allUsersObj.indexOf(socket.id), 1)
    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
})