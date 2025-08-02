const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
// Recommended: Use a persistent session store for production
// const MongoStore = require('connect-mongo');

// Load environment variables and config
dotenv.config();
require('./config/db')();
require('./config/passport');

const app = express();

// --- Middleware Setup ---

// 1. CORS: Correctly allows your frontend to communicate with the server.
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 2. Body Parser: Correctly placed to parse JSON before routes are handled.
app.use(express.json());

// 3. Session Management: Correctly configured for sessions.
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_key',
  resave: false,
  saveUninitialized: false,
  // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  }
}));

// 4. Passport Initialization: Correctly placed after session middleware.
app.use(passport.initialize());
app.use(passport.session());


// --- API Routes ---
// Routes are correctly defined and prefixed.

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const dishRoutes = require('./routes/dishRoutes');
app.use('/api/dishes', dishRoutes);

const chefRoutes = require('./routes/chefRoutes');
app.use('/api/chefs', chefRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);


// --- Base Route & Error Handling ---

// A simple base route to confirm the API is running.
app.get('/', (req, res) => res.send('API is running successfully'));

// Correctly handles requests to non-existent routes.
app.use((req, res, next) => {
  res.status(404).json({ message: "API route not found." });
});

// Correctly handles any other server errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred." });
});


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));