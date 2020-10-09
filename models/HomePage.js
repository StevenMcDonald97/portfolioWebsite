const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomePageSchema = new Schema({
	type: {type:String},
	name: { type: String},
	images: [{type: String}],
	subHeader: { type: String},
	description: { type: String},
	imageLinks:[{type:String}]
});

module.exports = mongoose.model('HomePage', HomePageSchema);