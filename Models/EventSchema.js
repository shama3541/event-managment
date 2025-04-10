const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
 time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  participants:{
    type: [String],
    default: [],
  }
});

module.exports = mongoose.model("Event", EventSchema);
