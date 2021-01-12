const express = require("express");
const UploadRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const { Blog, BlogPost } = require('../models/Blog');
const GenericPage = require("../models/GenericPage")
const Page = require("../models/Page")
const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');

require("@babel/polyfill");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/src/App/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})

var audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/src/App/audio')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})

var upload = multer({ 
  storage: storage,
  limits: {
      fieldNameSize: 200, 
      fieldSize: 20000, 
      fileSize: 5 * 1024 * 1024
  },
  fileFilter: function(_req, file, cb){
      checkFileType(file, cb);
  } 
}).array('file', 15);

var uploadAudio = multer({ 
  storage: audioStorage,
  limits: {
      fileSize: 4 * 1024 * 1024
  },
  fileFilter: function(_req, file, cb){
      checkAudioFileType(file, cb);
  } 
}).array('file',15);

const checkFileType = (file, cb)=>{
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

const checkAudioFileType = (file, cb)=>{
  const filetypes = /mp3|mp4|ogg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if(extname){
    return cb(null,true);
  } else {

    cb('Error: MP3, MP4, and OGG Only!');
  }
}

UploadRouter.route('/rebuild').post(async function(req, res) {
  const rebuildFileName = __dirname +'/../client/src/App/rebuild.json';
  let styleObject = {"rebuild":Date.now()};
  let styleJson = JSON.stringify(styleObject, null, 2);
  await fs.writeFile(rebuildFileName, styleJson, (err) => {
      if (err) console.log(err);
      console.log('Data written to file');
  });

});

UploadRouter.route('/uploadImages').post(function(req, res) {
    upload(req, res, function (err) {
       if (err) { //instanceof multer.MulterError
          console.log(err);
          res.status(500);
          if (err.code == 'LIMIT_FILE_SIZE') {
            err.message = 'File Size is too large. Maximum file size is 5MB';
            err.success = false;
            return res.json(err)
          }

           // return res.json(err);
           return res.status(500).send("Error uploading image(s).");
       } else {
           res.status(200);
           return res.json({
               success: true,
               message: 'Images uploaded successfully!'
           });
       }

    });
});

UploadRouter.route('/uploadAudio').post(function(req, res) {
    uploadAudio(req, res, function (err) {
       if (err) { //instanceof multer.MulterError
          console.log(err);
          res.status(500);
          if (err.code == 'LIMIT_FILE_SIZE') {
            err.message = 'File Size is too large. Maximum file size is 4MB';
            err.success = false;
            return res.json(err)
          }

           // return res.json(err);
           return res.status(500).send("Problem uploading audio file(s). Please check your file type");
       } else {
           res.status(200);
           return res.json({
               success: true,
               message: 'Audio uploaded successfully!'
           });
       }

    });
});

UploadRouter.route('/storeImagesInDB').post(async function(req, res) {
 	await req.body.forEach((img)=>{
    let {oldPortfolio, ...newImg} =img;
 		// const newImage = new Image(newImg);

 	// 	newImage.save(function(err) {
		//     if (err) {
		//       console.error(err);
		//       return res.status(500).send("Error uploading image(s).");
		//     } 
		// });

    Image.findOneAndUpdate({title:img.title}, newImg, { upsert: true, new: true, setDefaultsOnInsert: true }, function(error, result) {
      if (error) {
        console.error(err);
        return res.status(500).send("Error uploading image(s).");
      }

      // do something with the document
  });

    Portfolio.findOneAndUpdate({title: newImg.portfolio}, {"$push": {"imageFileNames": newImg.fileName}}, { 'new': true }, (err, info) => {
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
      "visibility":true,
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
  
  return res.status(200).send("Success uploading page. Refresh to see change");

});

UploadRouter.route('/uploadListPage').post(function(req, res) {
  let objIds = [];
  req.body.objs.forEach((obj, index) => {
    const newListObject = new ListObject(obj);
    console.log("object information is: "+obj);
    console.log("object is: "+newListObject);

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
    return res.status(200).send("Success uploading page. Refresh page to see changes");
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
      return res.status(200).send("Success uploading page. Refresh the page to see changes");
    });
  }

});

UploadRouter.route('/uploadBlog').post(function(req, res) {
  // there should only be one blog
  Blog.findOne({}, function(err, page){
    if (!page) {
      let blogData = {
        "title":"blog",
        "text":req.body.text
      };

      let newBlog = new Blog(blogData);
      let pageLoaded = storePageInfo(newBlog, "blog", res);
      blogData.title = req.body.title;
      newBlog = new Blog(blogData);

      if (pageLoaded) {newBlog.save(function(err) {
            if (err) {
              console.error(err);
              return res.status(500).send("Error uploading page.");
            } 
        });
      }
    } else {
        return res.status(200).send(`You can only make one blog page! If you need to add a post, select your blog on edit pages`);
    }
    return res.status(200).send("Success creating the blog. Refresh the page to see changes");
  })

});

UploadRouter.route('/uploadBlogPost').post(function(req, res) {
  let postData = {
    "title":req.body.title,
    "blurb":req.body.blurb,
    "imgName":req.body.imgName,
    "paragraphs":req.body.paragraphs,
    "date":req.body.date,
    "num":req.body.num

  }

  const newBlogPost = new BlogPost(postData);

  newBlogPost.save(function (err) {
    if (err) {
      console.log(err);
      console.log("A problem occurred updating the blog");
    }
  });

  // there should only be one blog
  Blog.findOne({}, function(err, page){
    if (!page) {
      return res.status(200).send("Remember to also click upload on your add-Blog page");
    } else {
        if (page.postIds){
          page.postIds.push(newBlogPost._id);
        } else {
          page.postIds = newBlogPost._id;
        }
        page.save(function (err) {
          if (err) console.log("A problem occurred updating the blog");
        });
    }
    return res.status(200).send("Success uploading post. Refresh the page to see changes");
  });

});

UploadRouter.route('/uploadGenericPage').post(function(req, res) {

  let pageData={
    "title":req.body.title, 
    "paragraphs":req.body.paragraphs, 
    "imageNames":req.body.images,
    "imageText":req.body.imageText,
    "audioNames":req.body.audioNames,
    "audioText":req.body.audioText,
    "videoLinks":req.body.videoLinks,
    "videoText":req.body.videoText
  };
    
  const newPage=new GenericPage(req.body);
  newPage.imageNames = req.body.images;
  newPage.audioNames = req.body.audioNames;
  newPage.videoLinks = req.body.videoLinks;

  const pageLoaded=storePageInfo(newPage, "genericPage", res);

  if (pageLoaded) {newPage.save(function(err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading page.");
        } 
    });
  }
  
  return res.status(200).send("Success uploading page. Refresh to see change");

});

module.exports = UploadRouter;