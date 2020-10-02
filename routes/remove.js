const express = require("express");
const RemoveRouter = express.Router();
const fs = require("fs");
const multer = require('multer');
const Image = require('../models/image');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const Page = require("../models/Page");

RemoveRouter.route('/removeImages').post(function(req, res) {
 	req.body.forEach((imgName)=>{
    	const query = {'fileName': imgName};
    	Image.findOne({'fileName': imgName}).lean().exec(function(err, results){
    	    if (err) return console.error(err)
	        try {
	            const portfolio=results.portfolio;
	            Image.deleteOne({'fileName': imgName}).then(()=>
	            	console.log("Successfully deleted image"));

	            fs.unlink(`./client/src/App/upload/${imgName}`, (error)=>console.error(error));
	            console.log("unlinking "+imgName);
	            Portfolio.updateOne( {'title': portfolio}, { $pullAll: {imageFileNames: [ imgName ] } } ).then(()=>
	            	console.log("Successfully updated portfolio"));
	        } catch (error) {
	            console.log("errror getting results")
	            console.log(error)
	        } 	
    	})
	})
});

RemoveRouter.route('/removePage').post(function(req, res) {
	const page = req.body;
	console.log(req.body);
    const query = {_id: page._id};
    Page.findOneAndRemove(query, function(err,data){
    	if(err) console.error(err);
    });

    if (page.type==="text"){
		TextPage.findOneAndRemove(query,function(err,data)
			{
			    if(!err){
			        console.log("Deleted page");
			    } else {
			    	console.error(err);
			    }
			});
    } else if (page.type==="list"){
		ListPage.findOneAndRemove(query,function(err,data)
		{
		    if(!err){
		        console.log("Deleted page");
		    } else {
		    	console.error(err);
		    }
		});
    } else if (page.type==="portfolio"){
		Portfolio.findOneAndRemove(query,function(err,data)
		{
		    if(!err){
		        console.log("Deleted page");
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
			Page.findOneAndRemove(query, function(err,data){
		    	if(err) console.error(err);
		    });
		});
	}
});

module.exports = RemoveRouter;
