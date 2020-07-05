const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

let server = app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000");
});

let io = socket(server);

// connect with the clients(front-end)
io.on("connection", (socket) => {
  // here socket refers to the client that sends us data
  // receive data from the clients(front-end)
  socket.on("chat", (data) => {
    // emit the received data back to all the clients(front-end) connected
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data); // brodcast: data will only be recieved by the clients except the one who trigerred the event
  });
});
