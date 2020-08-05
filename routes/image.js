// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

const express = require('express');
const Image = require('../models/image');
const ImageRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../imageUploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now()+file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimeType === 'image/jpeg' || file.mimetype === 'image.png'){
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
	storage:storage,
	limits: {
		filesize:2048*2048*5
	},
	fileFilter: fileFilter
});

ImageRouter.route("/uploadmulter")
	.post(upload.single('imageData'), (req,res,next) => {
		console.log(req.body);
		const newImage = new Image({
			imageName: req.body.imageName,
			imageData: req.file.path
		});

		newImage.save()
			.then((result)=>{
				res.status(200).json({
					success: true,
					document: result
				});
			})
			.catch((err)=> next(err));
	});




module.exports = ImageRouter;







