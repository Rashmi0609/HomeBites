const router = require('express').Router();
const User = require('../models/User');
const Chef = require('../models/Chef');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to access the cart.' });
};

// === GET USER'S CART ===
// Handles GET requests to /api/cart
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Find the logged-in user and populate the cart with full chef details
    const user = await User.findById(req.user.id).populate('cart.chef');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error while fetching cart.' });
  }
});

// === ADD ITEM TO CART ===
// Handles POST requests to /api/cart
router.post('/', isAuthenticated, async (req, res) => {
  const { chefId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    
    // Check if the chef is already in the cart
    const itemIndex = user.cart.findIndex(item => item.chef.toString() === chefId);
    
    if (itemIndex > -1) {
      return res.status(400).json({ message: 'This chef is already in your cart.' });
    }

    // Add the new chef to the cart array
    user.cart.push({ chef: chefId });
    await user.save();
    
    // Populate the cart to send back the full details
    await user.populate('cart.chef');
    res.status(201).json(user.cart);

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error while adding to cart.' });
  }
});

// === REMOVE ITEM FROM CART ===
// Handles DELETE requests to /api/cart/:itemId
router.delete('/:itemId', isAuthenticated, async (req, res) => {
    const { itemId } = req.params;
    try {
        const user = await User.findById(req.user.id);

        // Filter out the item to be removed
        user.cart = user.cart.filter(item => item._id.toString() !== itemId);
        
        await user.save();
        await user.populate('cart.chef');
        res.status(200).json(user.cart);

    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Server error while removing from cart.' });
    }
});


module.exports = router;
