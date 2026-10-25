const mongoose = require("mongoose");
<<<<<<< HEAD
=======
<<<<<<< HEAD

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ["admitted", "not_admitted"], default: "not_admitted" },
  createdAt: { type: Date, default: Date.now }
});

=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },
  patientId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0, max: 125 },
  status: { type: String, enum: ["admitted", "not_admitted"], default: "not_admitted" },
  roomNumber: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
module.exports = mongoose.model("Patient", patientSchema);
