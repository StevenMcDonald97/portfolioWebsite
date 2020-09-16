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

UploadRouter.route('/storeImagesInDB').post(async function(req, res) {
 	await req.body.forEach((img)=>{
    [oldPortfolio, ...newImg] =img;
 		const newImage = new Image(newImg);
 		newImage.save(function(err) {
		    if (err) {
		      console.error(err);
		      return res.status(500).send("Error uploading image(s).");
		    } 
		});

    var query = {'title': newImg.portfolio};
    Portfolio.findOneAndUpdate(query, {"$push": {"imageFileNames": newImg.fileName}},{ 'new': true }, (err, info) => {
          if (err) {
            console.log(err);
              return err;
          } 
      });
  });
  return res.status(200).send("Success uploading image(s).");

});

// create a record pointing to a page's data
async function storePageInfo(page, type, res){
  await Page.countDocuments({}, async function (err, count) {
    let pageInformation = {
      "title":page.title,
      "type":type,
      "_id":page._id,
      "index":count
    }
    let result=true;
    const pageInfo = new Page(pageInformation);
    await Page.find({title: pageInfo.title}, function (err, docs) {
          if (docs.length){
              res.send("Title Already Exists");
              result=false;
          }else{
              pageInfo.save(function(err) {
              if (err) {
                console.error(err);
                res.status(500).send("Error adding to list of pages.");
                result= false;
              }
            });
          }
      });
    return result;
  });
}

UploadRouter.route('/uploadTextPage').post(function(req, res) {
  const newPage=new TextPage(req.body);
  const pageLoaded=storePageInfo(newPage, "text", res);

  if (pageLoaded) {newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } 
    });
  }
  

});

UploadRouter.route('/uploadListPage').post(function(req, res) {
  let objIds = [];
  req.body.objs.forEach((obj, index) => {
    const newListObject = new ListObject(obj);

    objIds.push(newListObject._id);
    newListObject.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading list object.");
        } 
    });

  });

  // there should only be one of each type of list page (Events, Galleries, or Workshops)
  ListPage.findOne({type:req.body.type}, function(err, page){
    if (!page) {
      let pageData = {
        "type":req.body.type,
        "title":req.body.title,
        "text":req.body.text,
        "objectIds":objIds
      };

      const newPage = new ListPage(pageData);
      const pageLoaded = storePageInfo(newPage, "list", res);
      if (pageLoaded) {newPage.save(function(err) {
            if (err) {
              console.error(err);
              res.status(500).send("Error uploading page.");
            } 
        });
      }
    } else {
        res.status(200).send(`A ${req.body.type} page already exists!`);
    }
  })

});


UploadRouter.route('/uploadPortfolio').post(function(req, res) {
  const newPortfolio = new Portfolio(req.body);
  const pageLoaded = storePageInfo(newPortfolio, "portfolio", res);
  if (pageLoaded) {newPortfolio.save(function(err) {
        if (err) {
          console.error(err);
          Page.fineOneAndRemove({title:newPortfolio.title}, 
            function (err, docs) { 
              if (err){ 
                  console.log(err) 
              } 
              else{ 
                  console.log("Removed page : ", docs); 
              } 
          }); 
          res.status(500).send("Error uploading page.");
        } else {

          // update images added to the portfolio and their old portfolio, if any
          newPortfolio.imageFileNames.forEach((name)=>{
            Image.findOne({fileName:name}, function(err, img){

              if (err){
                console.log(`Error updating image ${name}`);


                Portfolio.fineOneAndRemove({title:newPortfolio.title}, 
                  function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                }); 

                Page.fineOneAndRemove({title:newPortfolio.title}, 
                  function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Removed page : ", docs); 
                    } 
                }); 
                return done(err);
              }  

              if(img){
                let oldPortfolio=img.portfolio;
                Portfolio.findOneAndUpdate( {title: oldPortfolio}, { "$pull": {imageFileNames:name} }, { 'new': true }, (err, info) => {
                    if (err) {
                        return err;
                    } else {
                        if (!info) {
                            console.log('no portfolio found');
                        } else {
                          console.log(info);
                        }
                    }
                });
              }
            })
            Image.updateOne({fileName:name}, {portfolio:newPortfolio.title}).exec();
          });

        }
    });
  }

});

module.exports = UploadRouter;