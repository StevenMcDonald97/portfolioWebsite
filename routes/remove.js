const express = require("express");
const RemoveRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const Page = require("../models/Page");

RemoveRouter.route('/removeImages').post(function(req, res) {
 	req.body.forEach((img)=>{
    	const query = {'fileName': img.fileName};
	    Image.findOneAndRemove(query, function(err,data)
			{
			    if(!err){
			        console.log("Deleted image");
			    } else {
			    	console.error(err);
			    }
			});
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

});


module.exports = RemoveRouter;
