const path = require("path");
const dotenv = require("dotenv");

// Force dotenv to load from Backend/.env
dotenv.config({ path: path.resolve(__dirname, ".env") });
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // to parse JSON
app.use(cors()); // allow frontend to call backend

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

// Default route (just for test)
app.get("/", (req, res) => {
  res.send("✅ Hospital Management System API is running...");
});

// Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
