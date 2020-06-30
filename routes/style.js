
const express = require('express');
const withAuth = require('../middleware/withAuth');
const StyleRouter = express.Router();
const fs = require('fs');
const fileName = __dirname +'/../client/src/App/style.json';
const file = require(fileName);



StyleRouter.route('/changeStyle')
	.post(function(req, res) {
		console.log(req.body);
		let styleObject = req.body;
		let styleJson = JSON.stringify(styleObject, null, 2);
		fs.writeFile(fileName, styleJson, (err) => {
		    if (err) throw err;
		    console.log('Data written to file');
		});
});

module.exports = StyleRouter;
