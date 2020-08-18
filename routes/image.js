// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

const express = require('express');
const ImageRouter = express.Router();
const Image = require('../models/image');

ImageRouter.route("/getAll")
	.get(function(req, res) {
		console.log("here");

        Image.find({}, function(err, images) {
        	console.log(images);
           res.send(images);
        });
    });

module.exports = ImageRouter;







