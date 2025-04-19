const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  publishedYear: Number,
  library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel
