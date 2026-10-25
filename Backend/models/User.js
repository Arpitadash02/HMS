const mongoose = require("mongoose");
<<<<<<< HEAD

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
=======
const DEPARTMENTS = ["Cardiology", "Cardiac Surgery", "Orthopedics", "Neurology", "Neurosurgery", "Pediatrics", "Gynecology", "General Medicine"];
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], required: true, default: "patient" },
  department: { type: String, enum: DEPARTMENTS, required: function () { return this.role === "doctor"; } },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("User", userSchema);
module.exports.DEPARTMENTS = DEPARTMENTS;
>>>>>>> master
