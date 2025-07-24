const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  alt: {
    type: String, // Alt text for accessibility
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Dish || mongoose.model('Dish', DishSchema);
