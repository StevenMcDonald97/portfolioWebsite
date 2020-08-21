const express = require("express");
const UploadRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const Page = require("../models/Page")

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, './client/src/App/upload')
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
		      return res.status(500).send("Error uploading image(s).");
		    } 
		});

    var query = {'title': img.portfolio};

    Portfolio.findOneAndUpdate(
      query, 
      {$push: {'imageFileNames': img.FileName}}
    );
	})

});

// create a record pointing to a page's data
const storePageInfo = (page, res) =>{
  let pageInformation = {
    "title":page.title,
    "type":"text",
    "_id":page._id
  }
  const pageInfo = new Page(pageInformation);
    pageInfo.save(function(err) {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding to list of pages.");
      }
    });
}

UploadRouter.route('/uploadTextPage').post(function(req, res) {
  const newPage=new TextPage(req.body);
  newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } else {
          storePageInfo(newPage, res);
        }
    });

});

UploadRouter.route('/uploadListPage').post(function(req, res) {
  let objIds = [];
  req.body.objs.forEach((obj, index) => {
    const newListObject = new ListObject(obj);
    console.log(obj);
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

  const newPage = new ListPage(pageData);

  newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } else {
          storePageInfo(newPage, res);
        }
    });
});


UploadRouter.route('/uploadPortfolio').post(function(req, res) {
  const newPortfolio = new Portfolio(req.body);

  newPortfolio.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } else {
           storePageInfo(newPortfolio, res);
           // for each image added to the portfolo, update the image's portfolio field
          newPortfolio.imageFileNames.forEach(async (imageFileName,index)=>{ 
            Image.findOneAndUpdate({ fileName: imageFileName }, {$set:{portfolio:newPortfolio.title}}, function(err,updated){
                if(err){
                  console.log("error");
                }else{
                  console.log(updated);
                }
              })

          })
        }
    });

});

module.exports = UploadRouter;