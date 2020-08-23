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
    	const query = {'fileName': img.fileName};
	    Image.findOneAndUpdate(query, {$set:img});
	})

});


EditRouter.route('/editTextPage').post(function(req, res) {
	const page = req.body.page;
    const query = {_id: page._id};
	TextPage.findOneAndUpdate(query, {$set:page});

});

EditRouter.route('/editListPage').post(function(req, res) {
	const page = req.body.page;
    const query = {_id: page._id};
	ListPage.findOneAndUpdate(query, {$set:page});

});

EditRouter.route('/editPortfolio').post(function(req, res) {
	const page = req.body.page;
    const query = {_id: page._id};
	Portfolio.findOneAndUpdate(query, {$set:page});

});

module.exports = EditRouter;