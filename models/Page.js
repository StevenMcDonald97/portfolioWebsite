const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
	_id:{type:mongoose.Schema.Types.ObjectId},
	type: { type: String, required: true, unique: false },
	title: { type: String, unique:true},
	index : {type:Number}
});

module.exports = mongoose.model('Page', PageSchema);