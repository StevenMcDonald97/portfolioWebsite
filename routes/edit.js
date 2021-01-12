const express = require("express");
const EditRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const HomePage = require('../models/HomePage');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const GenericPage = require("../models/GenericPage")
const { Blog, BlogPost } = require('../models/Blog');
const Page = require("../models/Page");
const Footer = require("../models/Footer");
const fs = require('fs');
const layoutFileName = __dirname +'/../client/src/App/layout.json';
var mongoose = require('mongoose');
require("@babel/polyfill");

EditRouter.route('/updateLinks').post(async function(req,res){
    // const LinkData={"headerAlignment":this.state.headerAlignment, "menuStyle":this.state.menuStyle, "portfolioStyle":this.state.portfolioStyle, "pages":this.state.pages};
    const newLayoutJson = JSON.stringify({headerAlignment:req.body.headerAlignment, menuStyle:req.body.menuStyle, portfolioStyle:req.body.portfolioStyle});
	await fs.writeFile(layoutFileName, newLayoutJson, (err) => {
	    if (err) console.log(err); 
	});

	for (let i=0; i<req.body.pages.length; i++){

		let editPage = req.body.pages[i];
		if (editPage.type==="parent"){
			editPage.children=req.body.children[editPage.title];
		}

		if (editPage._id){
			Page.findOneAndUpdate({_id: editPage._id}, editPage, function(err, doc){
			    if(err){
			    	console.log(err);
			        console.log("Something wrong updating link data!");
                	res.status(500).send("Error adding to list of pages.");
			    }
			});
		} else {
			let pageData = editPage;
			pageData["_id"] = mongoose.Types.ObjectId();
			let newPage = new Page(pageData);

			newPage.save(function(err) {
              if (err) {
                console.error(err);
                res.status(500).send("Error adding to list of pages.");
              }
            });
		}
	}

	 res.status(200).send("Success updating layout. Give the server a minute to update then refresh the page");

});


EditRouter.route('/editImages').post(function(req, res) {
 	req.body.forEach((img)=>{
    	let {oldPortfolio, ...update}=img;
    	const query = {'fileName': img.fileName};

	    Image.findOneAndUpdate(query, update, {new: true }, (err, obj) => console.log("editing image: "+obj.title));
		
		if (oldPortfolio && oldPortfolio!=update.portfolio){

			Portfolio.findOneAndUpdate({title: update.portfolio}, {"$push": {imageFileNames: update.fileName}},{ 'new': true }, (err, info) => {
				if (err) {
					console.log(err);
					return err;
				} 
			});

            Portfolio.findOneAndUpdate( {title: oldPortfolio}, { "$pull": {imageFileNames:update.fileName} }, { 'new': true }, (err, info) => {
                if (err) {
                	console.log(err);
                    return err;
                } else {
                    if (!info) {
                        console.log('no portfolio found');
                    }
                }
            });
   		} else {
   			Portfolio.findOneAndUpdate({title: update.portfolio}, {"$push": {imageFileNames: update.fileName}},{ 'new': true }, (err, info) => {
				if (err) {
					console.log(err);
					return err;
				} 
			});
   		}

	});
});

EditRouter.route('/editHomePage').post(function(req, res) {
	HomePage.findOneAndUpdate({}, req.body, {upsert: true}, function(err, doc) {
	    if (err) return res.send(500, {error: err});
	    return res.send('Succesfully updated your home page.');
	});
});

EditRouter.route('/editFooter').post(function(req, res) {
	Footer.findOneAndUpdate({}, req.body, {upsert: true}, function(err, doc) {
	    if (err) return res.send(500, {error: err});
	    return res.send('Succesfully updated your home page.');
	});
});



EditRouter.route('/editTextPage').post(function(req, res) {
	const page = req.body;
    const query = {_id: new mongoose.Types.ObjectId(page.id)};
    const update={
		type: page.type,
		title: page.title,
		imgName: page.imgName,
		mainText: page.mainText,
		subText: page.subText
    }

	TextPage.findOneAndUpdate(query, update,
		{new: true }, (err, obj) => {
			if (err) console.log(err); return err;
			res.status(200).send("Success edited page. Refersh to see change");
	});

	Page.findOneAndUpdate(query, {title:page.title},
			{new: true }, (err, obj) => {
		if (err) console.log(err); return err;
		console.log(page.title);
		console.log(obj);
	});


});

EditRouter.route('/editListPage').post(function(req, res) {
	const page = req.body;
    const pageQuery = {_id: page.id};
	// delete objects which were removed and unlink associated images
    if (req.body.deleted.length>0){
    	req.body.deleted.forEach(objectId=>{
    		ListObject.findById(objectId, function (err, object) {
    			if (object.imgName) {
					fs.unlink(`./client/src/App/images/${object.imgName}`, (error)=>console.error(error));
    			}
    		});
    	});
    	ListObject.deleteMany({ _id: {$in: req.body.deleted}}, function(err){console.log(err)});
    } 

// ------------ upsert new objects----------
	var objIds = [];
	req.body.objs.forEach((obj) => {
		var {_id, ...newUpdate}=obj;
		var objectUpdate={title:newUpdate.title, blurb:newUpdate.blurb, imgName:newUpdate.imgName, description:newUpdate.description, num:newUpdate.num} 
		
		var objectQuery = _id ? {_id:_id} : {_id:mongoose.Types.ObjectId()};

		ListObject.findOneAndUpdate(objectQuery, objectUpdate, {upsert: true, new: true}, (err, doc)=> {
		    if (err) {console.log(err); return res.status(500).send({error: err})};
		    objIds.push(doc._id);
		    if (objIds.length===req.body.objs.length){
		    	const pageUpdate={
					type: page.type,
					title: page.title,
					text: page.text,
					objectIds: objIds
			    }	
			    ListPage.findOneAndUpdate(pageQuery, pageUpdate,
					{new: true }, (err, obj) => console.log("listPage: "+ obj.title));
		    }

		});

	});
	res.status(200).send("Success edited page. Refersh to see change");

// ---------------------------------------------------

});

EditRouter.route('/editPortfolio').post(function(req, res) {

	const portfolioPage = req.body;
    const query = {title: portfolioPage.oldTitle};
    const update={
    	title: portfolioPage.title,
		description: portfolioPage.description,
		mainImageUrl: portfolioPage.mainImageUrl,
		imageFileNames: portfolioPage.imageFileNames
    }
	// Portfolio.findOneAndUpdate(query, update,  
	// 	{new: true }, (response) => console.log(response));

	// find the portfolio
	// add or remove images from its image list and change their portfolio
	// if an image is in another portfolio, remove it from that portfolio's list

	Page.findOne(query,function(err, page){
		if (!page) {
		  return res.status(200).send(`A problem occurred finding that portfolio`);
		} else {
			page.title= req.body.title;
			page.save(function (err) {
		      if (err) return res.status(200).send(`A problem occurred updating that portfolio`);
		    });
		}
	});

	Portfolio.findOne(query, function(err, portfolio){

        if (err){
            return done(err);
        }  

        if (!portfolio){
        	console.log("NO PORTFOLIO WAS FOUND");
        }

		let oldFileNames = portfolio.imageFileNames;
		Portfolio.updateOne(query, update).exec();

		// set images removed from the portfolio to have no portfolio
		oldFileNames.forEach((name)=>{
			if (!update.imageFileNames.includes(name)){
				Image.updateOne({fileName:name}, {portfolio:""}).exec();
			}
		})

		// update images added to the portfolio and their old portfolio, if any
		update.imageFileNames.forEach((name)=>{
			if (!oldFileNames.includes(name)){
				Image.findOne({fileName:name}, function(err, img){
					if (err){
						console.log(`Error updating image ${name}`);
			            return done(err);
			        }  
			        if(img && portfolioPage.title !== img.portfolio){
			        	let oldPortfolio=img.portfolio;
		                Portfolio.findOneAndUpdate( {title: oldPortfolio}, { "$pull": {imageFileNames:name} }, { 'new': true }, (err, info) => {
		                    if (err) {
		                        return err;
		                    } else {
		                        if (!info) {
		                            console.log('no portfolio found');
		                        }
		                    }
		                });			        
		            }
				})

			} 

			Image.updateOne({fileName:name}, {portfolio:portfolioPage.title}).exec();

		});
		res.status(200).send("Success editing page.");

	})
});

EditRouter.route('/editBlog').post(function(req, res) {
    if (req.body.deleted.length>0){
    	req.body.deleted.forEach(objectId=>{
    		BlogPost.findById(objectId, function (err, object) {
    			if (object.imgName) {
					fs.unlink(`./client/src/App/images/${object.imgName}`, (error)=>console.error(error));
    			}
    		});
    	});
    	BlogPost.deleteMany({ _id: {$in: req.body.deleted}}, function(err){console.log(err)});
    } 

  Page.findOne({"type":"blog"},function(err, page){
    if (!page) {
      res.status(200).send(`A problem occurred finding that blog post`);
    } else {
		page.title=req.body.title;
		page.save(function (err) {
          if (err) console.log("A problem occurred updating your blog");
        });
    }
  });

  // there should only be one blog
  Blog.findOne({}, function(err, blog){
    if (!blog) {
      res.status(200).send(`A problem occurred finding that blog post`);
    } else {
		blog.title=req.body.title;
		blog.text=req.body.text;
		blog.save(function (err) {
          if (err) console.log("A problem occurred updating your blog");
        });
    }
    return res.status(200).send("Success uploading post. Refresh the page to see changes");
  });

});

EditRouter.route('/editBlogPost').post(function(req, res) {
  // there should only be one blog
  BlogPost.findOne({_id:req.body._id}, function(err, post){
    if (!post) {
      res.status(200).send(`A problem occurred finding that blog post`);
    } else {
		post.title=req.body.title;
		post.blurb=req.body.blurb;
		post.imgName=req.body.imgName;
		post.paragraphs=req.body.paragraphs;
		post.save(function (err) {
          if (err) return console.log("A problem occurred updating the blogpost");
        });
    }
    return res.status(200).send("Success uploading post. Refresh the page to see changes");
  });

});

EditRouter.route('/editGenericPage').post(function(req, res) {
	let query = {_id:new mongoose.Types.ObjectId(req.body._id)};

	Page.findOne(query,function(err, page){
		if (!page) {
		  return res.status(200).send(`A problem occurred updating that page`);
		} else {
			page.title= req.body.title;
			page.save(function (err) {
		      if (err) {
		      	return res.status(200).send(`A problem occurred updating that page`);
		      }
		    });
		}
	});

	var resultHandler = function(err) { 
	    if(err) {
	       console.log("unlink failed", err);
	    } else {
	       console.log("file deleted");
	    }
	}

	if (req.body.deletedImages){
	    req.body.deletedImages.forEach(image=>
			fs.unlink(`./client/src/App/images/${image}`, resultHandler)
		);
	}

	if (req.body.deletedAudio){
	    req.body.deletedAudio.forEach((audio)=>
			{
				console.log(audio);
				fs.unlink(`./client/src/App/audio/${audio}`, resultHandler)
			} 
		);
	}

	GenericPage.findOne(query, function(err, page){
	    if (!page) {
	      return res.status(200).send(`A problem occurred locating and updating that page`);
	    } else {
			page.title=req.body.title;
			page.paragraphs=req.body.paragraphs;
			page.imageNames=req.body.images;
			page.imageText=req.body.imageText;
			page.audioNames=req.body.audioNames;
			page.audioText=req.body.audioText;
			page.videoLinks=req.body.videoLinks;
			page.videoText=req.body.videoText;		

			page.save(function (err) {
	          if (err) return res.status(200).send("A problem occurred updating that page");
	        });
	    }
	    res.status(200).send("Success uploading post. Refresh the page to see changes");
	});

});

module.exports = EditRouter;