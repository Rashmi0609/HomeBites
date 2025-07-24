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
  }
});

module.exports = router;



