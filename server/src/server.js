const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./libs/db");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const positionRoutes = require("./routes/positionRoutes");
const errorMiddleware = require("./utils/error.middleware");

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/position", positionRoutes);

// Error middleware
app.use(errorMiddleware);

// Connect to DB and start server
dbConnect((client) => {
  if (client) {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running on port ${process.env.PORT || 5000}`);
    });
  } else {
    console.log("Database connection failed");
    process.exit(1);
  }
});

