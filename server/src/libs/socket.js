const { Server } = require("socket.io");

/**
 * Initializes socket.io with the HTTP server and sets up event listeners.
 * @param {http.Server} server - Node HTTP server
 * @returns {Server} - Socket.IO server instance
 */
function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Handle joining election room
    socket.on("joinElectionRoom", (electionId) => {
      console.log(`Socket ${socket.id} joining election room: ${electionId}`);
      socket.join(electionId);
    });

    // Handle leaving election room
    socket.on("leaveElectionRoom", (electionId) => {
      console.log(`Socket ${socket.id} leaving election room: ${electionId}`);
      socket.leave(electionId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    // Add other custom socket events here if needed
  });

  return io;
}

module.exports = initSocket;
