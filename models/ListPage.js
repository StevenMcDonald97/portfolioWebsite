const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListPageSchema = new Schema({
	type: { type: String, required: true, unique: false },
	title: { type: String, required: true, unique: true },
	text: { type: String, required: false, unique: false },
	objectIds: [{ type: String}]

});

const ListObjectSchema = new Schema({
	title: { type: String, required: true, unique: false },
	img: { data: Buffer, contentType: String, required: false },
	description: { type: String, required: false, unique: false },
});


module.exports = {
  ListPage: mongoose.model('ListPage', ListPageSchema),
  ListObject: mongoose.model('ListObject',ListObjectSchema)
}