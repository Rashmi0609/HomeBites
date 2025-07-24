const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle callback from Google
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    successRedirect: 'http://localhost:5173/dishes' // Frontend success page
  })
);

module.exports = router;
