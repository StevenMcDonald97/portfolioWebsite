const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomePageSchema = new Schema({
	name: { type: String},
	image: { type: String},
	subHeader: { type: String}
});

module.exports = mongoose.model('HomePage', HomePageSchema);