const { bookingModel } = require("../Models/booking.model");

const createBooking = async (req, res) => {
  try {
    const { providerId, serviceType, date, time, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!providerId || !serviceType || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let bookingData = {
      user: userId,
      serviceType,
      date: date || new Date(),
      paymentMethod,
      status: 'confirmed'
    };

    if (serviceType === 'PGs & Flats') {
      bookingData.pg = providerId;
    } else {
      bookingData.worker = providerId;
    }

    if (time) {
      bookingData.time = time;
    }

    const booking = await bookingModel.create(bookingData);

    return res.status(201).json({
      message: "Booking confirmed successfully",
      booking
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await bookingModel.find({ user: userId })
      .populate('worker', '-password')
      .populate('pg')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Bookings fetched successfully",
      bookings
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getWorkerBookings = async (req, res) => {
  try {
    const workerId = req.user._id;
    const bookings = await bookingModel.find({ worker: workerId })
      .populate('user', '-password')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Worker bookings fetched successfully",
      bookings
    });
  } catch (error) {
    console.error("GET WORKER BOOKINGS ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      message: "Booking status updated successfully",
      booking
    });
  } catch (error) {
    console.error("UPDATE BOOKING ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBooking, getUserBookings, getWorkerBookings, updateBookingStatus };

