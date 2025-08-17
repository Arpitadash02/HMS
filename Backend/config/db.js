const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("MONGO_URI from env:", process.env.MONGO_URI);
try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true, // ⚠️ only for development
    });
    console.log("✅ MongoDB Connected");
  } 
  catch (err) {
    console.error("❌ Error connecting DB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
