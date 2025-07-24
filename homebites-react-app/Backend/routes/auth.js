const express = require("express");
const router = express.Router();
const passport = require("passport");

// Dummy user login (replace with DB later)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Replace with real DB check
  if (email === "test@example.com" && password === "123456") {
    const user = { id: 1, name: "Mishu", email };
    req.login(user, err => {
      if (err) return res.status(500).json({ message: "Login failed" });
      return res.json(user);
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Get current logged-in user
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send("Logout error");
    res.clearCookie("connect.sid");
    res.send("Logged out");
  });
});

module.exports = router;
