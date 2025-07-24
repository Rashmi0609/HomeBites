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
const User = require('../models/User');

const router = express.Router();

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
});

module.exports = router;
