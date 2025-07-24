const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // We store the details of the booked chefs directly in the order
  items: [
    {
      name: { type: String, required: true },
      specialty: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef', required: true }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['PhonePe', 'Google Pay (GPay)', 'Cash on Delivery'], // Allowed values
  },
  status: {
    type: String,
    default: 'Order Placed',
  },
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
