const mongoose = require("mongoose");
<<<<<<< HEAD

=======
>>>>>>> master
const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
<<<<<<< HEAD
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
});

=======
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  admissionStatus: { type: String, enum: ["pending", "admitted", "not_admitted"], default: "pending" },
  roomNumber: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});
appointmentSchema.index({ doctor: 1, date: 1 });
>>>>>>> master
module.exports = mongoose.model("Appointment", appointmentSchema);
