const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Basic Info
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // optional for Google users
  },

  // Optional fields
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  contactNumber: {
    type: String, // keep for compatibility
  },

  // Google Auth
  googleId: {
    type: String,
  },

  // Cart Functionality
  cart: [
    {
      chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true,
      },
    }
  ]
}, { timestamps: true });

// Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
