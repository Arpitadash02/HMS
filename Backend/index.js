const path = require("path");
<<<<<<< HEAD
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
=======
<<<<<<< HEAD
const dotenv = require("dotenv");

// Force dotenv to load from Backend/.env
dotenv.config({ path: path.resolve(__dirname, ".env") });
// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

=======
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
<<<<<<< HEAD
=======
<<<<<<< HEAD

// Routes
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

<<<<<<< HEAD
=======
<<<<<<< HEAD
// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // to parse JSON
app.use(cors()); // allow frontend to call backend

// API Routes
=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const app = express();
const port = Number(process.env.PORT) || 3000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
<<<<<<< HEAD
    // Permit non-browser clients (curl, health checks) and configured frontend origins.
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
=======
    // Permit non-browser clients (curl, mobile, health checks)
    if (!origin) return callback(null, true);
    // Allow any localhost / 127.0.0.1 origin or explicit CLIENT_ORIGIN
    if (
      allowedOrigins.includes(origin) ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => res.json({ message: "Hospital Management System API is running" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

<<<<<<< HEAD
app.use((err, _req, res, _next) => {
  console.error(err.message);
=======
<<<<<<< HEAD
// Default route (just for test)
app.get("/", (req, res) => {
  res.send("✅ Hospital Management System API is running...");
});

// Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
=======
app.use((err, _req, res, _next) => {
  console.error("Server error:", err.message);
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
  res.status(500).json({ message: "Internal server error" });
});

async function start() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be set to a random secret of at least 32 characters.");
  }
  await connectDB();
  app.listen(port, "0.0.0.0", () => console.log(`HMS API listening on port ${port}`));
}

start().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
