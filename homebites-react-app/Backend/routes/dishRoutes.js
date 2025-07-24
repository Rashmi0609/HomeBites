const router = require('express').Router();
const Dish = require('../models/Dish'); // Import the Dish model

// === GET ALL DISHES ===
// This endpoint will be reached at GET /api/dishes/
router.get('/', async (req, res) => {
  try {
    // Find all documents in the Dish collection
    const dishes = await Dish.find({});
    res.status(200).json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ message: 'Server error while fetching dishes.' });
  }
});

module.exports = router;
