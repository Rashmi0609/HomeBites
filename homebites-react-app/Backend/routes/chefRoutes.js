<<<<<<< HEAD
const router = require('express').Router();
const Chef = require('../models/Chef');
const Dish = require('../models/Dish'); // We need this to find the dish ID

// === GET CHEFS (with optional filtering by dish) ===
// This endpoint will be reached at GET /api/chefs/
// or GET /api/chefs?dish=Paneer%20Naan
router.get('/', async (req, res) => {
  try {
    const { dish } = req.query; // Get the dish name from the URL query
    let chefs;

    if (dish) {
      // If a dish is specified, find its ID first
      const dishDoc = await Dish.findOne({ name: dish });
      
      if (dishDoc) {
        // Then, find all chefs who have that dish's ID in their 'dishes' array
        chefs = await Chef.find({ dishes: dishDoc._id });
      } else {
        // If the dish name doesn't exist, return an empty array
        chefs = [];
      }
    } else {
      // If no dish is specified, find all chefs
      chefs = await Chef.find({});
    }
    
    res.status(200).json(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ message: 'Server error while fetching chefs.' });
=======
const express = require('express');
const router = express.Router();
const Chef = require('../models/Chef');

// GET /api/chefs/:dishName
router.get('/:dishName', async (req, res) => {
  const { dishName } = req.params;
  console.log('🔍 Looking for chefs who cook:', dishName);

  try {
    // Case-insensitive match for dish name
    const chefs = await Chef.find({
      dishes: {
        $elemMatch: {
          $regex: new RegExp(`^${dishName}$`, 'i')
        }
      }
    });

    if (chefs.length === 0) {
      console.log('⚠️ No chefs found for dish:', dishName);
    } else {
      console.log('👨‍🍳 Found chefs:', chefs);
    }

    res.json(chefs);
  } catch (err) {
    console.error('❌ Error fetching chefs:', err);
    res.status(500).json({ error: 'Server error' });
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
  }
});

module.exports = router;
<<<<<<< HEAD
=======



>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
