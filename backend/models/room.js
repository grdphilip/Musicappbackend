const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
