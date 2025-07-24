// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback',
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     const existingUser = await User.findOne({ googleId: profile.id });

//     if (existingUser) {
//       return done(null, existingUser); // ✅ User exists
//     }

//     // 🆕 Create and save new user
//     const newUser = await new User({
//       googleId: profile.id,
//       name: profile.displayName,
//       email: profile.emails[0].value,
//     }).save();

//     return done(null, newUser);
//   } catch (err) {
//     return done(err, null);
//   }
// }));

// // Save user to session
// passport.serializeUser((user, done) => {
//   done(null, user.id); // save Mongo _id
// });

// // Retrieve user from session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });


//
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback', // full URL
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); // ✅ User already exists
      }

      // 🆕 Create new user with minimal fields
      const newUser = new User({
        googleId: profile.id,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        email: profile.emails?.[0].value,
        password: '', // Google login doesn’t need password
        address: '',
        contactNumber: ''
      });

      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      console.error("Google auth error:", err);
      return done(err, null);
    }
  }
));

// Save user to session
passport.serializeUser((user, done) => {
  done(null, user._id); // Store MongoDB _id
});

// Retrieve user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
