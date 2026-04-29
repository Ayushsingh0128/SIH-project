const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    dob: {
    type: Date,
    required: true
  },
    gender: {
    type: String,
    enum: ["male", "female"],  // only allow these two values
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  wishlist: {
    type: [String],
    default: []
  }
});


let userModel = mongoose.model("User", userSchema);

module.exports = {userModel};