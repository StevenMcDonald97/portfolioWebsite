const express = require("express");
const UploadRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const TextPage = require('../models/textPage');
const {ListPage, ListObject} = require('../models/listPage');
const Portfolio = require('../models/portfolio');

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
		      res.status(500).send("Error uploading image(s).");
		    } 
		});
	})

});


UploadRouter.route('/uploadTextPage').post(function(req, res) {
  const newPage=new TextPage(req.body);
  newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } 
    });

});

UploadRouter.route('/uploadListPage').post(function(req, res) {
  let objIds = [];
  req.body.objs.forEach((obj, index) => {
    let newListObject = new ListLobject(obj);
    objIds.push(newListObject._id);
    newListObject.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading list object.");
        } 
    });

  });

  let pageData = req.body;
  pageData.objectIds=objIds;

  const newPage=new ListPage(pageData);

  newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } 
    });

});


UploadRouter.route('/uploadPortfolio').post(function(req, res) {
  const newPortfolio=new Portfolio(req.body);
  newPortfolio.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } 
    });

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