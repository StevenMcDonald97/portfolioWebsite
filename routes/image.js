// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

const express = require('express');
const ImageRouter = express.Router();
const multer = require('multer');
const uploadController = require("../controllers/uploadImages");

ImageRouter.route("/uploadimages")
	.post(uploadController.multipleUpload);

module.exports = ImageRouter;







