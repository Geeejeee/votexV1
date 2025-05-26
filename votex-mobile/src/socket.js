import { io } from "socket.io-client";

// Use your deployed backend for production
const socket = io(
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.26:5000" // local IP for dev mobile testing
    : "https://votexv1-backend.onrender.com", // production backend with HTTPS
  {
    transports: ["websocket"],
    withCredentials: true,
  }
);

export default socket;
