const express = require("express");
const EditRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const Page = require("../models/Page");

EditRouter.route('/editImages').post(function(req, res) {
 	req.body.forEach((img)=>{
 		const update = img;
    	const query = {'fileName': img.fileName};
	    Image.findOneAndUpdate(query, update,
			{new: true }, (obj) => console.log(obj));
	})

});


EditRouter.route('/editTextPage').post(function(req, res) {
	const page = req.body;
    const query = {_id: page.id};
    const update={
		type: page.type,
		title: page.title,
		imgUrl: page.imgUrl,
		mainText: page.mainText,
		subText: page.subText
    }
	TextPage.findOneAndUpdate(query, update,
		{new: true }, (obj) => console.log(obj));

});

EditRouter.route('/editListPage').post(function(req, res) {
	const page = req.body;
    const query = {_id: page.id};
    const update={
		type: page.type,
		title: page.title,
		text: page.text,
		objectIds: page.objectIds
    }	
    ListPage.findOneAndUpdate(query, update,
		{new: true }, (obj) => console.log(obj));

});

EditRouter.route('/editPortfolio').post(function(req, res) {
	const page = req.body;
    const query = {title: page.title};
    const update={
    	title: page.title,
		description: page.description,
		mainImageUrl: page.mainImageUrl,
		imageFileNames: page.imageFileNames
    }

	// Portfolio.findOneAndUpdate(query, update,  
	// 	{new: true }, (response) => console.log(response));

	Portfolio.findOne(query, function(err, obj) { 
		obj.imageFileNames.forEach((name,index)=>{
			if (!page.imageFileNames.includes(name)){
				let imageUpdate={portfolio:""};
				let imageQuery = {fileName:name};

				Image.findOne(imageQuery, function(err, obj){
					if(err) return err;
					const portfolio=obj.portfolio;
					console.log(obj);
	            	Portfolio.updateOne( {'title': portfolio}, { $pullAll: {imageFileNames: [ name ] } } ).then(()=>
	            	console.log("Successfully updated portfolio"));
				})

				Image.findOneAndUpdate(imageQuery, imageUpdate,
					{new: true }, (obj) => console.log(obj)
				);
			}
		});
		Portfolio.updateOne({title:page.title}, update).exec();

	});

	page.imageFileNames.forEach((name, index)=> {
		let imageUpdate={portfolio:page.title};
		let imageQuery = {fileName:name};
		Image.findOneAndUpdate(imageQuery, imageUpdate,
			{new: true }, (obj) => console.log(obj));

	});
});

module.exports = EditRouter;