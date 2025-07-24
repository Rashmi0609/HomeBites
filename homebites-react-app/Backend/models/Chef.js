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
  location: {
    type: String,
    default: 'Unknown'
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish' // Connects to Dish model
  }]
}, { timestamps: true });

module.exports = mongoose.models.Chef || mongoose.model('Chef', ChefSchema);
