const Patient = require("../models/Patient");

// Add a patient
const addPatient = async (req, res) => {
  try {
    const { patientId, name, age, status } = req.body;
    const patient = new Patient({ patientId, name, age, status });
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addPatient, getPatients, getPatientById };
