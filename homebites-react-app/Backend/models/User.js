const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, default: null, unique: false }, // optional for Google users
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users, but required for local registration
  address: String,
  contactNumber: String
});

module.exports = mongoose.model('User', userSchema);


