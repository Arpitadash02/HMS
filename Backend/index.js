const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const port = Number(process.env.PORT) || 3000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Permit non-browser clients (curl, health checks) and configured frontend origins.
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => res.json({ message: "Hospital Management System API is running" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err.message);
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
