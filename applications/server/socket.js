const { Server } = require("socket.io");
const chatSocket = require("./sockets/chatSocket");
const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  chatSocket(io);
  return io;
};

module.exports = initSocket;
