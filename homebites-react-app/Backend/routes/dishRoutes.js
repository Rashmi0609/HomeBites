const router = require('express').Router();
const Dish = require('../models/Dish');

// GET ALL DISHES
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.status(200).json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ message: 'Server error while fetching dishes.' });
  }
});

module.exports = router;
