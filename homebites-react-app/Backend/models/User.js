const mongoose = require('mongoose');

<<<<<<< HEAD
// This is the final User Schema with relaxed validation for Google users.
const UserSchema = new mongoose.Schema({
  // --- FIX IS HERE ---
  // The 'required' constraint is removed from firstName and lastName
  // to prevent errors for users who sign up via Google.
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  
  // --- Other Core User Details ---
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Not required, for Google users
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },

  // For users who sign in with Google
  googleId: {
    type: String,
  },
  
  // Cart functionality remains unchanged
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
=======
const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  contactNumber: String
});

module.exports = mongoose.model('User', UserSchema);
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227

// This line prevents the "OverwriteModelError" on server restart
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
