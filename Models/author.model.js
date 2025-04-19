const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
});

const authorModel = mongoose.model('Author', authorSchema);

module.exports = authorModel
