const mongoose = require('mongoose');

// This is the final User Schema with relaxed validation for Google users.
const UserSchema = new mongoose.Schema({
  // The 'required' constraint is removed from these fields
  // to prevent errors for users who sign up via Google.
  firstName: {
    type: String,
    trim: true, // Automatically removes whitespace from the beginning and end
  },
  lastName: {
    type: String,
    trim: true, // Automatically removes whitespace from the beginning and end
  },
  
  // --- Other Core User Details ---
  email: {
    type: String,
    required: [true, 'Email is required.'], // Added a custom error message
    unique: true,
    trim: true,
    lowercase: true, // Stores email in a consistent, lowercase format
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.'], // Ensures email format is valid
  },
  password: {
    type: String, // Not required, for Google users
    select: false, // Prevents the password from being sent back in queries by default for security
  },
  phone: {
    type: String,
    trim: true,
    // Adds validation only if a phone number is provided
    validate: {
        validator: function(v) {
            // This regex allows for 10-15 digit numbers, optionally with a leading '+'
            return !v || /^\+?[0-9]{10,15}$/.test(v);
        },
        message: 'Please enter a valid phone number.'
    }
  },
  address: {
    type: String,
    trim: true,
  },

  // For users who sign in with Google
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Creates a unique index but allows multiple documents to have a null value
  },
  
  // Cart functionality
  cart: [
    {
      chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true
      },
    }
  ]

}, { timestamps: true });

// This line prevents the "OverwriteModelError" on server restart
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);