require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/database/db");
const userRoute = require("./src/Routes/user.routes");
const workerRoute = require("./src/Routes/worker.routes");
const pgRoute = require("./src/Routes/pg.routes");
const bookingRoute = require("./src/Routes/booking.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ['http://localhost:5173'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

connectDB();

app.use("/user", userRoute);
app.use("/workers", workerRoute);
app.use("/pgs", pgRoute);
app.use("/bookings", bookingRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});