const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Local Strategy: Email and Password Login
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return done(null, false, { message: 'No user with that email found.' });
    if (!user.password) return done(null, false, { message: 'Please use the "Login with Google" button.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Password incorrect.' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Google Strategy: OAuth Login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback', // Replace with full URL for local dev
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser); // ✅ User already exists
    }

    // 🆕 Create new user from Google profile
    const newUser = new User({
      googleId: profile.id,
      firstName: profile.name?.givenName || '',
      lastName: profile.name?.familyName || '',
      email: profile.emails?.[0].value,
      password: '', // Google login doesn't use password
      contactNumber: '0000000000', // Placeholder
      address: 'Not provided' // Placeholder
    });

    await newUser.save();
    return done(null, newUser);
  } catch (err) {
    console.error('Google auth error:', err);
    return done(err, null);
  }
}));

// Session Handling
passport.serializeUser((user, done) => {
  done(null, user._id); // store MongoDB user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
