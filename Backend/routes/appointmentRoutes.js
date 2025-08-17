const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Book an appointment
router.post("/", async (req, res) => {
  try {
    const { patient, doctor, date } = req.body;
    const appointment = new Appointment({ patient, doctor, date });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name")
      .populate("doctor", "name email role");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointments for one patient
router.get("/patient/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id })
      .populate("doctor", "name");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
