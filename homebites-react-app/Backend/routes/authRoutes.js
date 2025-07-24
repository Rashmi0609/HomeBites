const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const CLIENT_URL = "http://localhost:5173"; // Adjust to your frontend domain

// --- Registration Route ---
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phone, address } = req.body;
  
  if (!firstName || !lastName || !email || !password || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'A user with this email or phone already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// --- Login Route (Using Passport Local Strategy) ---
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message || "Login failed" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

// --- Google OAuth Login ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}/login-success`,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

// --- Logout Route ---
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(CLIENT_URL);
  });
});

// --- Get Current Authenticated User ---
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
