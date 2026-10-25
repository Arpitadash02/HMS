const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing. Configure it in Backend/.env or your hosting provider's environment variables.");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
module.exports = connectDB;
