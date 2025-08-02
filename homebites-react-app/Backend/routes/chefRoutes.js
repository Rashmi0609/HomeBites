const router = require('express').Router();
const Chef = require('../models/Chef');
const Dish = require('../models/Dish');

// GET CHEFS (with optional filtering by dish)
router.get('/', async (req, res) => {
  try {
    const { dish } = req.query;
    let chefs;

    if (dish) {
      const dishDoc = await Dish.findOne({ name: dish });
      if (dishDoc) {
        chefs = await Chef.find({ dishes: dishDoc._id });
      } else {
        chefs = [];
      }
    } else {
      chefs = await Chef.find({});
    }
    
    res.status(200).json(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ message: 'Server error while fetching chefs.' });
  }
});

module.exports = router;
