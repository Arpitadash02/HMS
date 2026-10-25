const express = require("express");
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
module.exports = router;
