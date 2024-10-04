const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: [{ item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', billSchema);
