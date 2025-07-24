<<<<<<< HEAD
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
=======
// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Make sure the path is correct

// const router = express.Router();

// // Register Route
// router.post('/register', async (req, res) => {
//   console.log("Register request body:", req.body);

// const { firstName, lastName, email, password, address, contactNumber } = req.body;

// if (!firstName || !lastName || !email || !password || !address || !contactNumber) {
// return res.status(400).json({ message: 'All fields are required' });
// }

// try {
// const existingUser = await User.findOne({ email });
// if (existingUser)
// return res.status(400).json({ message: 'User already exists with this email' });
// const hashedPassword = await bcrypt.hash(password, 10);

// const newUser = new User({
//   firstName,
//   lastName,
//   email,
//   password: hashedPassword,
//   address,
//   contactNumber
// });

// await newUser.save();
// res.status(201).json({ message: 'User registered successfully' });
// } catch (err) {
// console.error('Registration error:', err);
// res.status(500).json({ message: 'Server error during registration' });
// }
// });

// // Login Route
// router.post('/login', async (req, res) => {
// const { email, password } = req.body;

// if (!email || !password)
// return res.status(400).json({ message: 'Email and password are required' });

// try {
// const user = await User.findOne({ email });
// if (!user)
// return res.status(404).json({ message: 'User not found with this email' });
// const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch)
//   return res.status(400).json({ message: 'Invalid email or password' });

// // Optional: set session if using express-session
// if (req.session) {
//   req.session.userId = user._id;
// }

// res.status(200).json({ message: 'Login successful', user });
// }catch (err) {
// console.error('Registration error:', err.message);
// res.status(500).json({ message: 'Server error during registration', error: err.message });
// }
// });

// module.exports = router;

//
const express = require('express');
const bcrypt = require('bcrypt');
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
const User = require('../models/User');

const CLIENT_URL = "http://localhost:5173";

<<<<<<< HEAD
// --- Registration Endpoint (Unchanged) ---
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, address } = req.body;
    if (!firstName || !lastName || !email || !password || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const userExists = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email or phone number already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// --- Email & Password Login Endpoint (Unchanged) ---
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message || "Login failed." });
        
        req.logIn(user, (err) => {
            if (err) return next(err);
            // For email login, we can still go directly to the dishes page
            return res.status(200).json({ success: true, redirectUrl: '/dishes' });
        });
    })(req, res, next);
});


// --- Google OAuth Routes (UPDATED) ---
// This route starts the Google login process
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// This is the route Google redirects back to after login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    // ** THE FIX IS HERE **
    // On success, redirect to our new /login-success page.
    successRedirect: `${CLIENT_URL}/login-success`,
    
    // On failure, redirect back to the normal login page.
    failureRedirect: `${CLIENT_URL}/login`,
  })
);


// --- Logout Route (Unchanged) ---
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    // Redirect to the frontend's homepage after logout
    res.redirect(CLIENT_URL);
  });
=======
// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, address, contactNumber } = req.body;
  if (!firstName || !lastName || !email || !password || !address || !contactNumber)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      contactNumber
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    if (req.session) {
      req.session.userId = user._id;
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
});

module.exports = router;
