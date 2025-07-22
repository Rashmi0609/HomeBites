 const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Load environment variables and config
dotenv.config();
require('./config/db')();           // Connect to MongoDB
require('./config/passport');       // Load Google OAuth config

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Your React frontend
  credentials: true
}));
app.use(express.json());

// Express-session middleware
app.use(session({
  secret: 'your_secret_key',        // Change this in production
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => res.send('API running'));

// Google OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
  }),
  (req, res) => {
    // Redirect to frontend after login
    res.redirect('http://localhost:5173');
  }
);

// Logout route (optional)
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

