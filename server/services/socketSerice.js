const { Server } = require("socket.io"); // Add this
const { saveMessage, getMessages } = require("./saveMessage");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://172.50.2.55:5173"],
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("join_room", (data) => {
      const { username, room } = data; // Data sent from client when join_room event emitted
      //   console.log(room);
      socket.join(room); // Join the user to a socket room
      getMessages(room)
        .then((lastMessages) => {
        //   console.log("latest messages", lastMessages);
          socket.emit("last_messages", lastMessages);
        })
        .catch((err) => console.log(err));
    });
    socket.on("send_message", (data) => {
      const { message, username, room, __createdtime__ } = data;
      io.in(room).emit("receive_message", data); // Send to all users in room, including sender
      saveMessage(message, username, room, __createdtime__) // Save message in db
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    });
    socket.on("leave_room", (data) => {
      const { username, room } = data;
      socket.leave(room);
      // Remove user from memory
      console.log(`${username} has left the chat`);
    });
  });
};
