const mongoose = require("mongoose");
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
<<<<<<< HEAD
=======
<<<<<<< HEAD
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
});

=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  admissionStatus: { type: String, enum: ["pending", "admitted", "not_admitted"], default: "pending" },
  roomNumber: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});
appointmentSchema.index({ doctor: 1, date: 1 });
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
module.exports = mongoose.model("Appointment", appointmentSchema);
