const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Load environment variables and config
dotenv.config();
require('./config/db')();
require('./config/passport');

const app = express();

// Middleware
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

const chefRoutes = require('./routes/chefRoutes');
app.use('/api/chefs', chefRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

// ** ADD THESE TWO LINES **
const orderRoutes = require('./routes/orderRoutes'); // 1. Import the new order routes
app.use('/api/orders', orderRoutes);               // 2. Use the routes with the /api/orders prefix

// Base route
app.get('/', (req, res) => res.send('API is running successfully'));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
