const express = require("express");
const RemoveRouter = express.Router();
const fs = require("fs");
const multer = require('multer');
const Image = require('../models/image');
const HomePage = require('../models/HomePage');
const TextPage = require('../models/TextPage');
const GenericPage = require("../models/GenericPage")
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const {Blog, BlogPost} = require('../models/Blog');
const Page = require("../models/Page");
require("@babel/polyfill");

RemoveRouter.route('/removeImages').post(function(req, res) {
 	req.body.forEach((imgName)=>{
    	const query = {'fileName': imgName};
    	Image.findOne({'fileName': imgName}).lean().exec(function(err, results){
    	    if (err) return console.error(err)
	        try {
	            const portfolio=results.portfolio;
	            Image.deleteOne({'fileName': imgName}).then(()=>
	            	console.log("Successfully deleted image"));

	            // fs.unlink(`./client/src/App/upload/${imgName}`, (error)=>console.error(error));
	            fs.unlink(`./client/src/App/images/${imgName}`, (error)=>console.error(error));
	            console.log("unlinking "+imgName);
	            Portfolio.updateOne( {'title': portfolio}, { $pullAll: {imageFileNames: [ imgName ] } } ).then(()=>
	            	console.log("Successfully updated portfolio"));
	        } catch (error) {
	            console.log("errror removing images")
	            console.log(error)
	        } 	
    	});
    	HomePage.findOne({}, function(err, result){
    		console.log("result: "+result);
    		if (err) return console.error(err);
    		try {
    			let images = result.images;
    			let index = images.indexOf(imgName);
    			if (index > -1){
    				result.images.splice(index,1);
    				result.imageLinks.splice(index,1);
    			}
    			console.log("updated result: "+result);
    			HomePage.findOneAndUpdate({}, result, function(err,data)
					{
					    if(!err){
					        console.log("removed image from home page");
					    } else {
					    	console.error(err);
					    }
					});
    		} catch (error) {
	            console.log("error removing images")
	            console.log(error)
    		}
    	});
	})
});

RemoveRouter.route('/removePage').post(function(req, res) {
	const page = req.body;
    const query = {_id: page._id};
    Page.deleteOne(query, function(err,data){
    	if(err) console.error(err);
    });

    if (page.type==="text"){
		TextPage.deleteOne(query,function(err,data)
			{
			    if(!err){
		        	console.log("Deleted page: "+page._id);
			    } else {
			    	console.error(err);
			    }
			});
    } else if (page.type==="list"){
    	ListPage.findOneAndDelete(query,function(err,page)
		{
		    if(!err){
		        if (page.objectIds){
		        	page.objectIds.forEach(objectId=>{
		        		ListObject.findOneAndDelete({_id:objectId}, function(err, object){
		        			if (object && object.imgName){
								Image.count({fileName: object.imgName}, function (err, count){ 
								    if(count<1){
										fs.unlink(`./client/src/App/images/${object.imgName}`, (error)=>console.error(error));
									}
								}); 
		        			} 
		        		});
		        	})
		        }
		        console.error("Success deleting page");
		    } else {
		    	console.error(err);
		    }
		});

    } else if (page.type==="portfolio"){
		Portfolio.deleteOne(query,function(err,data)
		{
		    if(!err){
		        console.log("Deleted page: "+page._id);
		    } else {
		    	console.error(err);
		    }
		});
    } else if (page.type==="blog"){
		Blog.findOneAndDelete(query,function(err,data)
		{
		    if(!err){
		        console.log("Deleted page: "+page._id);
		    } else {
		    	console.error(err);
		    }
		});
		BlogPost.find({},function(err,posts)
		{
		    posts.forEach(post=>{
		    	if (post.imgName != null){
					Image.count({fileName: post.imgName}, function (err, count){ 
					    if(count<1){
		    				fs.unlink(`./client/src/App/images/${post.imgName}`, (error)=>console.error(error));
						}
					}); 
    			} 
		    })
		});
		BlogPost.deleteMany({},function(err,data)
		{
		    if(!err){
		        console.log("Deleted blog posts");
		    } else {
		    	console.error(err);
		    }
		});

    } else if (page.type==="genericPage"){

		GenericPage.findOneAndDelete(query,function(err,page)
		{
		    if(!err){
		    	if (req.body.images){
		    		req.body.images.forEach(image=>{
						Image.count({fileName:image}, function (err, count){ 
						    if(count<1){
	    						fs.unlink(`./client/src/App/images/${image}`)
							}
						}); 
		    		});
		    	}
		    	if (req.body.audio){
		    		req.body.audio.forEach(audio=>
		    			fs.unlink(`./client/src/App/audio/${audio}`)
		    		);
		    	}
		        console.log("Deleted page: "+page._id);
		    } else {
		    	console.error(err);
		    }
		});
    }

	// find and update indices of pages after removing one
    let index=page.index;
    Page.find({} , (err, pageObj) => {
        if(err) console.log(err);

        if (pageObj.index>index){
		    pageObj.index = pageObj.index-1;

		    pageObj.save(function (err) {
		        if(err) {
		            console.error(err);
		        }
		    });
        }
    })

});

RemoveRouter.route('/removeLinks').post(function(req, res) {
	if (req.body && req.body.length>0){
		req.body.forEach((link)=>{
			query={_id:link};
			Page.deleteOne(query, function(err,data){
		    	if(err) console.error(err);
		    });
		});
	}
});

RemoveRouter.route('/removeBlogPost').post(function(req, res) {
	BlogPost.findOne({_id:req.body._id}, function (err, post) {
		if(err) {
			console.log(err);
		} else {
			Image.count({fileName:post.imgName}, function (err, count){ 
			    if(count<1){
					fs.unlink(`./client/src/App/images/${post.imgName}`, (error)=>console.error(error));
				}
			}); 
			console.log("Successful deletion");
		}
	});

  // there should only be one blog
	BlogPost.deleteOne({_id:req.body._id}, function (err) {
		if(err) console.log(err);
		console.log("Successful deletion");
	});

	Blog.findOneAndUpdate({}, { $pull: { "postIds": { _id: req.body._id } } }, { safe: true, upsert: true },
	    function(err) {
		    if(err) console.error(err);
    });



});


module.exports = RemoveRouter;
