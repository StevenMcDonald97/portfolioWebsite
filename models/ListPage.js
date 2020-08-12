const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListPageSchema = new Schema({
	type: { type: String, required: true, unique: true },
	title: { type: String, required: true, unique: false },
	text: { type: String, required: false, unique: false },
	objectIds: [{ type: String}]

});

const ListObjectSchema = new Schema({
	title: { type: String, required: true, unique: false },
	img: { data: Buffer, contentType: String, required: false },
	description: { type: String, required: false, unique: false },
});


module.exports = {
  listPage: mongoose.model('ListPage', ListPageSchema);,
  listObject: mongoose.model('ListObject',ListObjectSchema)
}