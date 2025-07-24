// models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  imageUrl: String
});

module.exports = mongoose.model('Food', foodSchema);
