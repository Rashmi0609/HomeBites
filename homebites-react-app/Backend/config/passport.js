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
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

<<<<<<< HEAD
// Strategy for Email & Password Login
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

// Strategy for Google Login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);
=======
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
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227

        // Create a new user from Google profile
        const newUser = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            // Provide placeholder data for fields Google doesn't give us
            phone: '0000000000', 
            address: 'Not provided'
        });

        await newUser.save();
        return done(null, newUser);
    } catch (err) {
        return done(err, null);
    }
}));

// Session Management
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
