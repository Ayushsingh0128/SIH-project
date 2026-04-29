const mongoose = require("mongoose");


let pgSchema = new mongoose.Schema({
    pgAddress:{
        type: String,
        required:true,
    },
    pgOwnerName: {
      type: String,
      required: true,
    },
    pgOwnerMobile: {
        type: String,
        required: true,
    },
    pgOwnerEmail: {
        type: String,
        required: true,
    },
    pgCity: {
        type: String,
        required: true,
    },
    pgState: {
        type: String,
        required: true,
    },
    pgPincode: {
        type: String,
        required: true,
    },
    pgCountry: {
        type: String,
        required: true,
    },
    pgRooms: {
        type: {
            '1bhk': {
                type: Number,
                default: 0,
                min: 0
            },
            '2bhk': {
                type: Number,
                default: 0,
                min: 0
            },
            '3bhk': {
                type: Number,
                default: 0,
                min: 0
            }
        },
        required: true
    },
    pgPrice: {
        type: {
            '1bhk': {
                type: Number,
                default: 0,
                min: 0
            },
            '2bhk': {
                type: Number,
                default: 0,
                min: 0
            },
            '3bhk': {
                type: Number,
                default: 0,
                min: 0
            }
        },
        required: true,
    },
    pgDescription: {
        type: String,
        required: true,
    },
    pgImages: {
        type: [String],
        default: [],
    },
    pgFacilities: {
        type: [String],
        default: [],
    },
    pgRules: {
        type: [String],
        default: [],
    },
    availability: {
        type: Boolean,
        default: true,
    },
    reviews: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
  });
  
  let pgModel = mongoose.model("pg", pgSchema);
  
  module.exports = {pgModel};