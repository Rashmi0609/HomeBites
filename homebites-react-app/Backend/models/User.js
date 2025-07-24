const mongoose = require('mongoose');

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

