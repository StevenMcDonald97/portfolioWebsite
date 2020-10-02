const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
	title: { type: String, required: true},
	description: { type: String},
	mainImageUrl: { type: String},
	imageFileNames: [{type:String}]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);