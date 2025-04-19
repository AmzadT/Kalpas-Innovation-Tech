const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  charge: { type: Number, required: true },
  returned: { type: Boolean, default: false }
});

const borrowModel = mongoose.model('Borrow', borrowSchema);

module.exports = borrowModel
