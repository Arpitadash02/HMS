const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
=======
<<<<<<< HEAD

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const Patient = require("../models/Patient");
const { DEPARTMENTS } = require("../models/User");
const safeUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, department: u.department || "" });

const registerUser = async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const role = ["patient", "doctor"].includes(req.body.role) ? req.body.role : "patient";
  const department = String(req.body.department || "");
  const age = Number(req.body.age);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8)
    return res.status(400).json({ message: "Enter a name, valid email, and password with at least 8 characters." });
  if (role === "doctor" && !DEPARTMENTS.includes(department))
    return res.status(400).json({ message: "Choose a valid doctor department." });
  if (role === "patient" && (!Number.isInteger(age) || age < 0 || age > 125))
    return res.status(400).json({ message: "Enter a valid patient age (0–125)." });
  try {
    if (await User.findOne({ email })) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), role, ...(role === "doctor" ? { department } : {}) });
    if (role === "patient") {
      const patientId = `HMS-${String(user._id).slice(-6).toUpperCase()}`;
      await Patient.create({ user: user._id, patientId, name, age, status: "not_admitted" });
    }
    return res.status(201).json({ message: "Registration successful.", user: safeUser(user) });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "An account with this email already exists." });
    console.error("Registration error:", err.message);
    return res.status(500).json({ message: "Could not register account. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid email or password." });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
    return res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Could not log in." });
  }
};
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
module.exports = { registerUser, loginUser };
