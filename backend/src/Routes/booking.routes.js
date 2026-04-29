const express = require("express");
const { createBooking, getUserBookings, getWorkerBookings, updateBookingStatus } = require("../controller/booking.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBooking);
router.get("/", getUserBookings);
router.get("/worker", getWorkerBookings);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;
