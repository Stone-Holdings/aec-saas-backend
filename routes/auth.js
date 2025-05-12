const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Sign Up Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create new user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: "User created successfully!", data });
  } catch (err) {
    console.error("Error during sign-up:", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    // Check for existing user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful!", data });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
