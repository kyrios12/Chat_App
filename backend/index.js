const express = require("express");
const port = 8080;
const {Server} = require("socket.io");
const cors = require("cors");

// Express app
const app = express();
const server = require("http").createServer(app);

// MiddleWares
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-mysz.vercel.app/",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  
  socket.on('send',(data)=>{
    io.emit('recieved_msg',data);
  })

  socket.on('like',(message)=>{
      io.emit('updateLikes',message);
  })

  socket.on('emoji',(data)=>{
    io.emit('emoji',data)
  })

});

server.listen(port, () => {
  console.log("listening on port: ", port);
});
