const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	fileName: { type: String, required: true, unique: false },
	title: { type: String, required: false, unique: false },
	date: { type: String, required: false, unique: false },
	size: { type: String, required: false, unique: false },
	medium: { type: String, required: false, unique: false },
	price: { type: String, required: false, unique: false },
	availability: { type: String, required: false, unique: false },
	portfolio: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('Image', ImageSchema);