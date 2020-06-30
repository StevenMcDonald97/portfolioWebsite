const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  date: { type: String, required: false, unique: false },
  size: { type: String, required: false, unique: false },
  medium: { type: String, required: false, unique: false },
  portfolio: { type: String, required: false, unique: false }
  // user: { type: String, required: true, unique: true },
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;