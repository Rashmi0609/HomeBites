const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  // This is the important part: It links chefs to the dishes they cook.
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish' // This refers to our 'Dish' model
  }]
}, { timestamps: true });

module.exports = mongoose.models.Chef || mongoose.model('Chef', ChefSchema);
