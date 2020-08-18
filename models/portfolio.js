const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
	title: { type: String, required: true, unique: true },
	desription: { type: String, required: false, unique: false },
	mainImage: { data: Buffer, contentType: String },
	images: [{type:String}]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);