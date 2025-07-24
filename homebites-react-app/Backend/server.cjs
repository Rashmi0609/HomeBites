// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const session = require('express-session');
// const passport = require('passport');

// // Load environment variables and config
// dotenv.config();
// require('./config/db')();           // Connect to MongoDB
// require('./config/passport');       // Load Google OAuth config

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',  // Your React frontend
//   credentials: true
// }));
// app.use(express.json());

// // Express-session middleware
// app.use(session({
//   secret: 'your_secret_key',        // Change this in production
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.get('/', (req, res) => res.send('API running'));

// // Google OAuth Routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // app.get('/auth/google/callback',
// //   passport.authenticate('google', {
// //     failureRedirect: '/',
// //     session: true,
// //   }),
// //   (req, res) => {
// //     // Redirect to frontend after login
// //     res.redirect('http://localhost:5173');
// //   }
// // );
// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/',
//     session: true,
//   }),
//   (req, res) => {
//     res.redirect('http://localhost:5173/login');
//   }
// );


// // Logout route (optional)
// app.get('/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('http://localhost:5173');
//   });
// });
// // Get current logged-in user
// app.get('/auth/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ msg: 'Not authenticated' });
//   }
// });


// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Load environment variables and config
dotenv.config();
require('./config/db')();           // MongoDB connection
require('./config/passport');       // Google OAuth config

const app = express();

// CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Sessions
app.use(session({
  secret: 'your_secret_key', // 🔐 Replace in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,      // true if using HTTPS
    httpOnly: true,     // prevent client-side access to cookies
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// 🆕 Local Auth Routes (manual login/logout/user check)
app.use('/auth', require('./routes/auth')); // STEP 2 ✅

// Google OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// After Google login
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
  }),
  (req, res) => {
    // ✅ Redirect to login page with user info in URL (Google Login)
    const { name, email, picture } = req.user;
    res.redirect(`http://localhost:5173/login?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&image=${encodeURIComponent(picture || '')}`);
  }
);

// Optional logout route
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.redirect('http://localhost:5173');
  });
});

// Home route
app.get('/', (req, res) => res.send('API running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

