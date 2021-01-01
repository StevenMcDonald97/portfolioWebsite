const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String }
});

const BlogPostSchema = new Schema({
	title: { type: String },
	blurb: { type:String },
	imgName: { type: String },
	paragraphs: [{ type: String }],
	date: { type:String },
	num: { type:Number }
});

module.exports = {
  Blog: mongoose.model('Blog', BlogSchema),
  BlogPost: mongoose.model('BlogPost',BlogPostSchema)
}

