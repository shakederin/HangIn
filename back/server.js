const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const { addUser, deleteUser } = require("./control/users");

const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://'}));

app.post("/login", firstDoor);
app.post("/user/add", addUser);
app.post("/user/delete", deleteUser);



const io = require("socket.io");

io.on("connection", (socket)=>{
    console.log("connected");
    socket.on("firstConecting", (data)=>{
        socket.broadcast.emit("")
    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
})