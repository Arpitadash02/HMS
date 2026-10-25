const express = require("express");
<<<<<<< HEAD
=======
<<<<<<< HEAD
const Patient = require("../models/Patient");

const router = express.Router();

// Add new patient
router.post("/", async (req, res) => {
  try {
    const { patientId, name, age, status } = req.body;
    const patient = new Patient({ patientId, name, age, status });
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const mongoose = require("mongoose");
const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.use(authMiddleware);
const totalBeds = () => {
  const n = Number.parseInt(process.env.HOSPITAL_TOTAL_BEDS || "50", 10);
  return Number.isFinite(n) && n > 0 ? n : 50;
};
router.get("/beds/availability", async (_req, res) => {
  try {
    const occupiedBeds = await Patient.countDocuments({ status: "admitted" });
    const total = totalBeds();
    res.json({ totalBeds: total, occupiedBeds, availableBeds: Math.max(0, total - occupiedBeds) });
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not load bed availability." }); }
});
router.post("/", async (req, res) => {
  if (!["doctor", "admin"].includes(req.user.role)) return res.status(403).json({ message: "Only doctors or admins can create a patient record." });
  const patientId = String(req.body.patientId || "").trim();
  const name = String(req.body.name || "").trim();
  const age = Number(req.body.age);
  if (!patientId || !name || !Number.isInteger(age) || age < 0 || age > 125) return res.status(400).json({ message: "Patient ID, name, and a valid age are required." });
  try { res.status(201).json(await Patient.create({ patientId, name, age, status: "not_admitted" })); }
  catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Patient ID already exists." });
    console.error(err.message); res.status(500).json({ message: "Could not create patient." });
  }
});
router.get("/", async (req, res) => {
  try {
    const query = req.user.role === "patient" ? { user: req.user._id } : {};
    res.json(await Patient.find(query).sort({ createdAt: -1 }));
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not load patients." }); }
});
router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid patient ID." });
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found." });
    if (req.user.role === "patient" && String(patient.user) !== String(req.user._id)) return res.status(403).json({ message: "You can only view your own record." });
    res.json(patient);
  } catch (err) { console.error(err.message); res.status(500).json({ message: "Could not load patient." }); }
});
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
module.exports = router;
