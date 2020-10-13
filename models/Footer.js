const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FooterSchema = new Schema({
	message: { type: String},
	facebook: { type: String},
	instagram: { type: String},
	twitter: { type: String},
	etsy: { type: String},
	linkedIn: { type: String},
	other:{type: String}
});

module.exports = mongoose.model('Footer', FooterSchema);