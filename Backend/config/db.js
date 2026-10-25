const mongoose = require("mongoose");

<<<<<<< HEAD
async function connectDB() {
=======
<<<<<<< HEAD
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

=======
async function connectDB(retries = 3, delay = 2000) {
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing. Configure it in Backend/.env or your hosting provider's environment variables.");
  }
<<<<<<< HEAD
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
=======

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Connecting to MongoDB Atlas (attempt ${attempt}/${retries})...`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 20000,
        family: 4,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, err.message);
      if (attempt === retries) {
        throw err;
      }
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
module.exports = connectDB;
