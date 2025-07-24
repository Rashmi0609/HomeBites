<<<<<<< HEAD
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
=======
// models/Chef.js
const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  location: String,
  dishes: [String] // e.g., ["Paneer Naan", "Chicken Curry"]
});

module.exports = mongoose.model('Chef', chefSchema);
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
