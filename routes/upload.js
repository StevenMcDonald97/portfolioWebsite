const express = require("express");
const UploadRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const textPage = require('../models/TextPage');
const  {listPage, listObject} = require('../models/ListPage');
const portfolio = require('../models/Portfolio');
const page = require("../models/Page")

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
    });

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
  const newPage=new textPage(req.body);
  newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } else {
          let pageInformation = {
            "title":req.body.title,
            "type":"text",
            "_id":newPage._id
          }
          const pageInfo = new page(pageInformation);
            pageInfo.save(function(err) {
              if (err) {
                console.error(err);
                res.status(500).send("Error adding to list of pages.");
              }
            });
        }
    });

});

UploadRouter.route('/uploadListPage').post(function(req, res) {
  let objIds = [];
  req.body.objs.forEach((obj, index) => {
    let newListObject = new listObject(obj);
    objIds.push(newListObject._id);
    newListObject.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading list object.");
        } 
    });

  });

  let pageData = {
      "type":req.body.type,
      "title":req.body.title,
      "text":req.body.text,
      "objectIds":objIds
    };

  const newPage=new listPage(pageData);

  newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } else {
          let pageInformation = {
            "title":req.body.title,
            "type":"list",
            "_id":newPage._id
          }
          const pageInfo = new page(pageInformation);
            pageInfo.save(function(err) {
              if (err) {
                console.error(err);
                res.status(500).send("Error adding to list of pages.");
              }
            });
        }
    });


});


UploadRouter.route('/uploadPortfolio').post(function(req, res) {
  const newPortfolio=new portfolio(req.body);
  newPortfolio.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } else {
          let pageInformation = {
            "title":newPortfolio.title,
            "type":"portfolio",
            "_id":newPortfolio._id
          }
          const pageInfo = new page(pageInformation);
            pageInfo.save(function(err) {
              if (err) {
                console.error(err);
                res.status(500).send("Error adding to list of pages.");
              }
            });
        }
    });

});

module.exports = UploadRouter;