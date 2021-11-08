var mongoose = require("mongoose");

var CarSchema = new mongoose.Schema({
  carName: { type: String, required: true, maxLength: 100 },
  amount: { type: Number, required: true, maxLength: 20 },
  currency: { type: String, required: true, maxLength: 10 },
});

module.exports = mongoose.model("Car", CarSchema);
