const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
	portfolioName: { type: String, required: true, unique: true },
	portfolioText: { type: String, required: false, unique: false },
	portfolioThumbnail: { data: Buffer, contentType: String },
	images: [{type:String}]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);