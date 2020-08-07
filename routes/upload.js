const express = require("express");
const UploadRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})

var upload = multer({ storage: storage }).array('file', 10)


UploadRouter.route('/uploadImages').post(function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

UploadRouter.route('/storeImagesInDB').post(function(req, res) {
	console.log(req.body);

 	req.body.forEach((img)=>{
 		const newImage = new Image(img);
 		newImage.save(function(err) {
		    if (err) {
		      console.error(err);
		      res.status(500).send("Error uploading image.");
		    } 
		});
	})

});


// UploadRouter.route('/removeImageFromDB').post(function(req, res) {
// 	console.log(req.body);


// });



// const newImage = new Image({
// 			imageName: req.body.imageName,
// 			imageData: req.file.path
// 		});

// 		newImage.save()
// 			.then((result)=>{
// 				res.status(200).json({
// 					success: true,
// 					document: result
// 				});
// 			})
// 			.catch((err)=> next(err));

module.exports = UploadRouter;