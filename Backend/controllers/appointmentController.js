const Appointment = require("../models/Appointment");

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date } = req.body;
    const appointment = new Appointment({ patient, doctor, date });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name")
      .populate("doctor", "name email role");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments for one patient
const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id })
      .populate("doctor", "name");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { bookAppointment, getAppointments, getAppointmentsByPatient };
