const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const CLIENT_URL = "http://localhost:5173";

// Registration Endpoint
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, contactNumber, address } = req.body;
    if (!firstName || !lastName || !email || !password || !contactNumber || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const userExists = await User.findOne({ $or: [{ email: email }, { contactNumber: contactNumber }] });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email or contact number already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            address,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Email & Password Login Endpoint
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message || "Login failed." });
        
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ success: true, redirectUrl: '/dishes' });
        });
    })(req, res, next);
});

// --- NEW: Add the session check route here ---
router.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    // If this runs, the session is successfully recorded.
    console.log('✅ Session is active. User:', req.user);
    res.status(200).json({
      isAuthenticated: true,
      user: req.user // Send back user data from the session
    });
  } else {
    // If this runs, there is no active session.
    console.log('❌ No active session.');
    res.status(401).json({ isAuthenticated: false });
  }
});


// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}/login-success`,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect(CLIENT_URL);
  });
});

module.exports = router;