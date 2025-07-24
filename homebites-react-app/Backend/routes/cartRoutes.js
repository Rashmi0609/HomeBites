<<<<<<< HEAD
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


=======
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, chefId, dishName, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    cart.items.push({ chefId, dishName, price });
    cart.total += price;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Get cart
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.chefId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
module.exports = router;
