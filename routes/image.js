// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

const express = require('express');
const ImageRouter = express.Router();
const Image = require('../models/image');
require("@babel/polyfill");

ImageRouter.route("/getAll")
	.get(function(req, res) {
        Image.find({}, function(err, images) {
           res.send(images);
        });
    });

module.exports = ImageRouter;







