const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },
  patientId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0, max: 125 },
  status: { type: String, enum: ["admitted", "not_admitted"], default: "not_admitted" },
  roomNumber: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Patient", patientSchema);
