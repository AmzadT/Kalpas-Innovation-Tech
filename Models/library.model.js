const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: String,
  location: String,
});

const libraryModel =  mongoose.model('Library', librarySchema);

module.exports = libraryModel