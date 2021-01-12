const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenericPageSchema = new Schema({
	title: { type: String},
	paragraphs: [{ type: String}],
	imageNames: [{ type: String}],
	imageText: [{ type: String}],
	videoLinks: [{ type: String}],
	videoText: [{ type: String}],
	audioNames:[{type:String}],
	audioText:[{ type: String}]
});



module.exports = mongoose.model('GenericPage', GenericPageSchema);