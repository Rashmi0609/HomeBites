const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// --- Strategy for Email & Password Login ---
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        // FIX 1: You must use .select('+password') because the User model hides it by default.
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        
        // If no user is found, or if they don't have a password set (i.e., Google-only account)
        if (!user || !user.password) {
            // FIX 2: Use a generic error message for security. Don't reveal if the email exists.
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        
        // If passwords match, return the user
        return done(null, user);

    } catch (err) {
        return done(err);
    }
}));


// --- Strategy for Google Login ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback', // FIX 3: Ensure this matches your server route
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }

        // FIX 4: Check if a user exists with that email but hasn't linked Google yet
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            // This is an existing local user. Link their Google account.
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
        }

        // If no user exists at all, create a brand new one
        const newUser = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
        });

        await newUser.save();
        return done(null, newUser);

    } catch (err) {
        return done(err, null);
    }
}));


// --- Session Management ---
// This part is correct and does not need changes.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});