const mongoose = require("mongoose");

let workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required:true,
  },
    dob: {
    type: Date,
    required: true
  },
    gender: {
    type: String,
    enum: ["male", "female"],  // only allow these two values
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
   profession: {
    type: [String],   // array of strings
    enum: [
      "plumber",
      "carpenter",
      "electrician",
      "cleaner",
      "sweeper",
      "laundry",
      "tiffin",
      "pg"
    ],
    required: true
  },
  availability: {
    type: Boolean,
    default: true,
  },
  rate: {
    type: Number,
    default: 0,
  },
  wishlist: {
    type: [String],
    default: []
  }
});

let workerModel = mongoose.model("Worker", workerSchema);

module.exports = {workerModel};