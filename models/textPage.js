const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextPageSchema = new Schema({
	type: { type: String, required: true, unique: false },
	title: { type: String, required: true, unique: true },
	img: { data: Buffer, contentType: String, required: false },
	mainText: { type: String, required: false, unique: false },
	subText: { type: String, required: false, unique: false },
});

module.exports = mongoose.model('TextPage', TextPageSchema);