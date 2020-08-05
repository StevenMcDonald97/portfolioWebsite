
const express = require('express');
const withAuth = require('../middleware/withAuth');
const StyleRouter = express.Router();
const fs = require('fs');
const fileName = __dirname +'/../client/src/App/style.json';
const file = require(fileName);

const writeToStyleJson = function(req, res) {
		let styleObject = req.body;
		let styleJson = JSON.stringify(styleObject, null, 2);
		fs.writeFile(fileName, styleJson, (err) => {
		    if (err) throw err;
		    console.log('Data written to file');
		});
}

StyleRouter.route('/changeStyle')
	.post(writeToStyleJson);

module.exports = StyleRouter;
