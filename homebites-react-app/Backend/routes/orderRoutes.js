const router = require('express').Router();
const User = require('../models/User');
const Order = require('../models/Order');

// Middleware to ensure the user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to perform this action.' });
};

// --- Your existing route to CREATE a new order (UNCHANGED) ---
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required.' });
    }
    const user = await User.findById(req.user.id).populate('cart.chef');
    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }
    const orderItems = user.cart.map(item => ({
      name: item.chef.name,
      specialty: item.chef.specialty,
      price: item.chef.price,
      image: item.chef.image,
      chefId: item.chef._id,
    }));
    const subtotal = user.cart.reduce((total, item) => total + item.chef.price, 0);
    const totalAmount = subtotal * 1.1;
    const newOrder = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      paymentMethod,
    });
    await newOrder.save();
    user.cart = [];
    await user.save();
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order.' });
  }
});

// === NEW: GET LATEST ORDER ===
// This endpoint finds the most recent order for the logged-in user.
// Handles GET requests to /api/orders/latest
router.get('/latest', isAuthenticated, async (req, res) => {
    try {
        // Find orders for the current user, sort by creation date (newest first), and get only one
        const latestOrder = await Order.findOne({ user: req.user.id })
                                       .sort({ createdAt: -1 });

        if (!latestOrder) {
            return res.status(404).json({ message: 'You have no recent orders.' });
        }

        res.status(200).json(latestOrder);
    } catch (error) {
        console.error('Error fetching latest order:', error);
        res.status(500).json({ message: 'Server error while fetching latest order.' });
    }
});


module.exports = router;
