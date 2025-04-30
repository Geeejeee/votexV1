const emitLiveResults = (data) => {
    const io = global.io; // access the global Socket.IO instance
    if (io) {
      io.emit("liveResults", data);
    } else {
      console.warn("Socket.IO not initialized yet.");
    }
  };
  
  module.exports = emitLiveResults;
  