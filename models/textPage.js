const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextPageSchema = new Schema({
	type: { type: String, required: true, unique: false },
	title: { type: String},
	imgUrl: { type: String},
	mainText: { type: String},
	subText: { type: String},
});

module.exports = mongoose.model('TextPage', TextPageSchema);