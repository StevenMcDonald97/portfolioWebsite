const express = require("express");
const EditRouter = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const HomePage = require('../models/HomePage');
const TextPage = require('../models/TextPage');
const  {ListPage, ListObject} = require('../models/ListPage');
const Portfolio = require('../models/Portfolio');
const Page = require("../models/Page");
const fs = require('fs');
const layoutFileName = __dirname +'/../../client/src/App/layout.json';
var mongoose = require('mongoose');

EditRouter.route('/updateLinks').post(async function(req,res){

    // const LinkData={"headerAlignment":this.state.headerAlignment, "menuStyle":this.state.menuStyle, "portfolioStyle":this.state.portfolioStyle, "pages":this.state.pages};
    const newLayoutJson = JSON.stringify({headerAlignment:req.body.headerAlignment, menuStyle:req.body.menuStyle, portfolioStyle:req.body.portfolioStyle});

	await fs.writeFile(layoutFileName, newLayoutJson, (err) => {
	    if (err) console.log(err); 
	});
	
	for (let i=0; i<req.body.pages.length; i++){
		if (req.body.pages[i]._id){
			Page.findOneAndUpdate({_id: req.body.pages[i]._id}, req.body.pages[i], function(err, doc){
			    if(err){
			        console.log("Something wrong updating link data!");
			    }
			});
		} else {
			let pageData = req.body.pages[i];
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
});


EditRouter.route('/editImages').post(function(req, res) {
 	req.body.forEach((img)=>{
    	let {oldPortfolio, ...update}=img;
    	const query = {'fileName': img.fileName};

	    Image.findOneAndUpdate(query, update, {new: true }, (err, obj) => console.log("editing image: "+obj.title));
		
		if (oldPortfolio && oldPortfolio!=update.portfolio){
			console.log("portfolio for "+img.title+" is changed");

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
   		}

	});
});

EditRouter.route('/editHomePage').post(function(req, res) {
	HomePage.findOneAndUpdate({}, req.body, {upsert: true}, function(err, doc) {
	    if (err) return res.send(500, {error: err});
	    return res.send('Succesfully updated your home page.');
	});
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
		{new: true }, (err, obj) => console.log("editing textPage: "+obj.title));
});

EditRouter.route('/editListPage').post(function(req, res) {
	const page = req.body;
    const pageQuery = {_id: page.id};
	// delete objects which were removed
    if (req.body.deleted.length>0) ListObject.deleteMany({ _id: {$in: req.body.deleted}}, function(err){console.log(err)});
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
// ---------------------------------------------------

});

EditRouter.route('/editPortfolio').post(function(req, res) {
	const page = req.body;
    const query = {title: page.oldTitle};
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
			        if(img && page.title !== img.portfolio){
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

				Image.updateOne({fileName:name}, {portfolio:page.title}).exec();

			}
		});
	})
});

module.exports = EditRouter;