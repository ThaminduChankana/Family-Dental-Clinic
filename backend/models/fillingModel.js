const mongoose = require("mongoose");

const fillingSchema = mongoose.Schema({
  nic: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  fillingMaterial: {
    type: String,
    required: true,
  },
  fillingType: {
    type: String,
    required: true,
  },
  anestheticStatus: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkup: {
    type: String,
  },
  procedure: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  },
});

const Filling = mongoose.model("Filling", fillingSchema);

module.exports = Filling;
