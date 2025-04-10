const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
  const { name, phone, bloodGroup, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, phone, bloodGroup, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered successfully" });
});

// Login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

module.exports = router;
