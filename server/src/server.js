const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const dbConnect = require("./libs/db");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const positionRoutes = require("./routes/positionRoutes");
const errorMiddleware = require("./utils/error.middleware");
const initSocket = require("./libs/socket"); // <<== import socket setup

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initSocket(server); // <<== initialize socket.io
app.set("io", io); // make io available to controllers via req.app.get("io")

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/position", positionRoutes);

// Error handler
app.use(errorMiddleware);

// Start DB and Server
dbConnect((client) => {
  if (client) {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } else {
    console.error("Database connection failed");
    process.exit(1);
  }
});
