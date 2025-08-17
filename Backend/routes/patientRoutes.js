const express = require("express");
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

module.exports = router;
