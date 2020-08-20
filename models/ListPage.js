const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListPageSchema = new Schema({
	type: { type: String, required: true},
	title: { type: String, required: true},
	text: { type: String},
	objectIds: [{ type: String}]

});

const ListObjectSchema = new Schema({
	title: { type: String},
	img: { type: String},
	description: { type: String},
	num: {type: Number}
});


module.exports = {
  ListPage: mongoose.model('ListPage', ListPageSchema),
  ListObject: mongoose.model('ListObject',ListObjectSchema)
}

