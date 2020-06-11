const mongoose = require("mongoose");
const LocationSchema = mongoose.Schema({
  neighborhoodName: {
    type: String,
    required: true,
    lowercase: true,
  },
  initial: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  distance: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Location", LocationSchema);
