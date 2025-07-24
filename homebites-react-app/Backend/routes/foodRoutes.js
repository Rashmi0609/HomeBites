// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const Food = require('../models/Food'); // You need to create this model

// GET all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).json({ message: 'Server error fetching food items' });
  }
});

module.exports = router;
