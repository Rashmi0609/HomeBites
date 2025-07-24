const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
require('./config/db')();         // Connect to MongoDB
require('./config/passport');     // Passport strategies (local, Google)

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true
}));
app.use(express.json());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Use `true` only in production (HTTPS)
    sameSite: 'lax' // Needed for cookies to work across ports
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ===== Routes =====
const authRoutes = require('./routes/authRoutes');
const chefRoutes = require('./routes/chefRoutes');
const cartRoutes = require('./routes/cartRoutes');
const dishRoutes = require('./routes/dishRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);

// ===== OAuth Callback Route =====
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: true
  }),
  (req, res) => {
    res.redirect('http://localhost:5173/dishes');
  }
);

// ===== Logout =====
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

// ===== Get Logged-in User =====
app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: 'Not authenticated' });
  }
});

// ===== Default Route =====
app.get('/', (req, res) => {
  res.send('API is running successfully');
});

// ===== Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
