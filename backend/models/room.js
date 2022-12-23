
const mongoose = require("mongoose");


const roomSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    require: true,
    unique: true,
  },
  genre: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
});

module.exports = mongoose.model("Room", roomSchema);
