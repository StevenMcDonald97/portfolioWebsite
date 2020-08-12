const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextPageSchema = new Schema({
	type: { type: String, required: true, unique: true },
	title: { type: String, required: true, unique: false },
	img: { data: Buffer, contentType: String, required: false },
	secondImg: { data: Buffer, contentType: String, required: false },
	thirdImg: { data: Buffer, contentType: String, required: false },
	mainText: { type: String, required: false, unique: false },
	subText: { type: String, required: false, unique: false },
});

module.exports = mongoose.model('TextPage', PageSchema);