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
	 	const update={
			title: page.title,
			fileName: page.fileName,
			size: page.size,
			medium: page.medium,
			price: page.price,
			availability: page.availability,
			portfolio: page.portfolio
	    }
    	const query = {'fileName': img.fileName};
	    Image.findOneAndUpdate(query, update,
			{new: true }, (err, obj) => console.log(obj));
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
		{new: true }, (err, obj) => console.log(obj));

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
		{new: true }, (err, obj) => console.log(obj));

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

	// find the portfolio
	// add or remove images from its image list and change their portfolio
	// if an image is in another portfolio, remove it from that portfolio's list

	Portfolio.findOne(query, function(err, portfolio){

        if (err){
            return done(err);
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
			        if(img){
			        	let oldPortfolio=img.portfolio;
			        	console.log(`The Old Portfolio is: ${oldPortfolio}`)
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

				Image.updateOne({fileName:name}, {portfolio:page.title}).exec();

			}
		});
	})
});

module.exports = EditRouter;