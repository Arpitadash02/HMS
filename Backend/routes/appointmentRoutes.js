const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { patient, doctor, date } = req.body;
  if (!mongoose.isValidObjectId(patient) || !mongoose.isValidObjectId(doctor) || !date || Number.isNaN(Date.parse(date)))
    return res.status(400).json({ message: "Choose a patient, doctor, and valid appointment date." });
  const appointmentDate = new Date(date);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (appointmentDate < today) return res.status(400).json({ message: "Appointment date cannot be in the past." });
  try {
    const [patientRecord, doctorRecord] = await Promise.all([Patient.findById(patient), User.findOne({ _id: doctor, role: "doctor" })]);
    if (!patientRecord) return res.status(404).json({ message: "Patient not found." });
    if (!doctorRecord) return res.status(404).json({ message: "Doctor not found." });
    if (req.user.role === "patient" && String(patientRecord.user) !== String(req.user._id)) return res.status(403).json({ message: "You can only book appointments for your own account." });
    if (req.user.role === "doctor" && String(doctorRecord._id) !== String(req.user._id)) return res.status(403).json({ message: "Doctors can only select themselves." });
    const appt = await Appointment.create({ patient, doctor, date: appointmentDate });
    res.status(201).json(await appt.populate([
      { path: "patient", select: "name patientId age status roomNumber" },
      { path: "doctor", select: "name email department role" }
    ]));
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not create appointment." }); }
});

router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "doctor") query.doctor = req.user._id;
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id }).select("_id");
      if (!patient) return res.json([]);
      query.patient = patient._id;
    }
    res.json(await Appointment.find(query).sort({ date: 1 })
      .populate("patient", "name patientId age status roomNumber")
      .populate("doctor", "name email role department"));
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not load appointments." }); }
});

router.patch("/:id/admission", async (req, res) => {
  if (!["doctor", "admin"].includes(req.user.role)) return res.status(403).json({ message: "Only a doctor or admin can update admission status." });
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid appointment ID." });
  const status = req.body.status;
  const roomNumber = String(req.body.roomNumber || "").trim();
  if (!["admitted", "not_admitted"].includes(status)) return res.status(400).json({ message: "Choose admitted or not admitted." });
  if (status === "admitted" && !roomNumber) return res.status(400).json({ message: "Enter a room/ward number for admitted patients." });
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found." });
    if (req.user.role === "doctor" && String(appt.doctor) !== String(req.user._id)) return res.status(403).json({ message: "You can only update your own appointments." });
    const patient = await Patient.findById(appt.patient);
    if (!patient) return res.status(404).json({ message: "Patient record not found." });
    if (status === "admitted") {
      const total = Math.max(1, Number.parseInt(process.env.HOSPITAL_TOTAL_BEDS || "50", 10) || 50);
      const occupied = await Patient.countDocuments({ status: "admitted" });
      if (patient.status !== "admitted" && occupied >= total) return res.status(409).json({ message: "No beds are currently available." });
    }
    patient.status = status;
    patient.roomNumber = status === "admitted" ? roomNumber : "";
    await patient.save();
    appt.admissionStatus = status;
    appt.roomNumber = status === "admitted" ? roomNumber : "";
    await appt.save();
    res.json({ message: "Admission status updated.", appointment: await appt.populate([
      { path: "patient", select: "name patientId age status roomNumber" },
      { path: "doctor", select: "name email department role" }
    ]) });
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not update admission status." }); }
});

router.patch("/:id/status", async (req, res) => {
  if (!["doctor", "admin"].includes(req.user.role)) return res.status(403).json({ message: "Only doctors or admins can update appointment status." });
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid appointment ID." });
  if (!["scheduled", "completed", "cancelled"].includes(req.body.status)) return res.status(400).json({ message: "Invalid appointment status." });
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found." });
    if (req.user.role === "doctor" && String(appt.doctor) !== String(req.user._id)) return res.status(403).json({ message: "You can only update your own appointments." });
    appt.status = req.body.status; await appt.save(); res.json(appt);
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not update appointment." }); }
});
module.exports = router;
