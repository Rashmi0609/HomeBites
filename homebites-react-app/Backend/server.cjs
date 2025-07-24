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

// const authRoutes = require('./routes/authRoutes'); // ⬅️ New import
// const chefRoutes = require('./routes/chefRoutes');
// const cartRoutes = require('./routes/cartRoutes');


// app.use('/api/auth', authRoutes); // ⬅️ Mount the register route
// app.use('/api/chefs', chefRoutes);
// app.use('/api/cart', cartRoutes);

// // Routes
// app.get('/', (req, res) => res.send('API running'));

// // Google OAuth Routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/',
//     session: true,
//   }),
//   (req, res) => {
//     // Redirect to frontend after login
//     res.redirect('http://localhost:5173');
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

// Load env & configs
dotenv.config();
require('./config/db')();
require('./config/passport');

const app = express();

// Middleware
<<<<<<< HEAD
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// --- Route Handling ---
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const dishRoutes = require('./routes/dishRoutes');
app.use('/api/dishes', dishRoutes);
=======
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // ✅ must be true for cookies
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // ✅ must be false in local HTTP (true only with HTTPS)
      sameSite: 'lax' // ✅ required for frontend-backend on different ports
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227

const chefRoutes = require('./routes/chefRoutes');
app.use('/api/chefs', chefRoutes);

<<<<<<< HEAD
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

// ** ADD THESE TWO LINES **
const orderRoutes = require('./routes/orderRoutes'); // 1. Import the new order routes
app.use('/api/orders', orderRoutes);               // 2. Use the routes with the /api/orders prefix

// Base route
app.get('/', (req, res) => res.send('API is running successfully'));
=======
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: true
  }),
  (req, res) => {
    res.redirect('http://localhost:5173/dishes'); // redirect after successful login
  }
);

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

// Get current user
app.get('/auth/user', (req, res) => {
  console.log("📦 Session:", req.session);
  console.log("👤 User from session:", req.user);

  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: 'Not authenticated' });
  }
});

// Default
app.get('/', (req, res) => {
  res.send('API is running...');
});
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
