// models/Chef.js
const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  location: String,
  dishes: [String] // e.g., ["Paneer Naan", "Chicken Curry"]
});

module.exports = mongoose.model('Chef', chefSchema);
