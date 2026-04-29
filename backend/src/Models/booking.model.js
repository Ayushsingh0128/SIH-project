const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  },
  pg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pg'
  },
  serviceType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'cod'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed'
  }
}, { timestamps: true });

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = { bookingModel };
