const express = require("express");
<<<<<<< HEAD
=======
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
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
});

// Login
router.post("/login", async (req, res) => {
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
});

=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
const { registerUser, loginUser } = require("../controllers/userController");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const { DEPARTMENTS } = require("../models/User");
const router = express.Router();
router.get("/departments", (_req, res) => res.json(DEPARTMENTS));
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, (req, res) => {
  const u = req.user;
  res.json({ id: u._id, name: u.name, email: u.email, role: u.role, department: u.department || "" });
});
router.get("/doctors", authMiddleware, async (_req, res) => {
  try { res.json(await User.find({ role: "doctor" }).select("name email department").sort({ department: 1, name: 1 })); }
  catch (err) { console.error(err.message); res.status(500).json({ message: "Could not load doctors." }); }
});
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
module.exports = router;
