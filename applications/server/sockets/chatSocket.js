const Message = require("../models/Message");
const ChatRoom = require("../models/chatRoom");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    socket.on("sendMessage", async (messageData) => {
      const { roomId, content, sender } = messageData;

      const message = new Message({
        sender,
        content,
        chatRoom: roomId,
      });

      try {
        await message.save();
        console.log(`Message saved: ${content}`);

        await ChatRoom.findByIdAndUpdate(roomId, {
          lastMessage: message._id,
        });

        io.to(roomId).emit("receiveMessage", {
          message: {
            _id: message._id,
            content: message.content,
            sender: { _id: sender },
            createdAt: message.createdAt,
          },
        });

        console.log(`Message sent to room ${roomId}: ${content}`);
      } catch (error) {
        console.error("Error saving message or updating chat room:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = chatSocket;
