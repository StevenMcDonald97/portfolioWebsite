const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
	title: { type: String, required: true},
	desription: { type: String},
	mainImage: { data: Buffer, contentType: String },
	images: [{type:String}]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);