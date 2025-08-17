const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ["admitted", "not_admitted"], default: "not_admitted" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
