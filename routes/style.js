
const express = require('express');
const StyleRouter = express.Router();
const fs = require('fs');
const fileName = __dirname +'/../client/src/App/style.json';
const cssFileName = __dirname +'/../client/src/App/css/_custom.scss';
require("@babel/polyfill");

const writeToStyleJson = async function(req, res) {
		let styleObject = req.body;
		let styleJson = JSON.stringify(styleObject, null, 2);
		await fs.writeFile(fileName, styleJson, (err) => {
		    if (err) console.log(err);
		    console.log('Data written to file');
		});

		let cssString = `$titleColor: ${ styleObject.text.WebsiteTitle.color };
		$headerFontFamily: ${ styleObject.text.headerFontFamily };
		$bodyFontFamily: ${ styleObject.text.bodyFontFamily };
		$titleSize: ${ styleObject.text.WebsiteTitle.size }px;	
		$pageHeaderColor: ${ styleObject.text.PageHeader.color };
		$pageHeadersize: ${ styleObject.text.PageHeader.size }px;
		$mediumHeaderColor:	${ styleObject.text.MediumHeader.color };
		$mediumHeaderSize:	${ styleObject.text.MediumHeader.size }px;
		$smallHeaderColor:	${ styleObject.text.SmallHeader.color };
		$smallHeaderSize:${ styleObject.text.SmallHeader.size }px;
		$bodyTextColor:	${ styleObject.text.BodyText.color };
		$bodyTextSize:	${ styleObject.text.BodyText.size }px;
		$navLinkColor:	${ styleObject.text.NavigationLink.color };
		$navLinkSize:	${ styleObject.text.NavigationLink.size }px;
		$otherLinkColor:${ styleObject.text.OtherLink.color };
		$hoverOnLinkColor:${ styleObject.text.HoverOnLink.color };
		$objectTextColor:${ styleObject.text.ObjectText.color };
		$objectTextSize:	${ styleObject.text.ObjectText.size }px;
		$titleBackgroundColor: ${ styleObject.backgroundColor.title };
		$headerBackgroundColor: ${ styleObject.backgroundColor.header };
		$navigationBackgroundColor:${ styleObject.backgroundColor.navigation };
		$bodyBackgroundColor:${ styleObject.backgroundColor.body };
		$emphasisBackgroundColor:${ styleObject.backgroundColor.emphasis };
		$objectBackgroundColor:${ styleObject.backgroundColor.object };
		$text:${ styleObject.backgroundColor.object };
		`
		console.log('here');

		await fs.writeFile(cssFileName, cssString, (err) => {
		    if (err) console.log(err);
		    console.log('Data written to file');
		});

}

StyleRouter.route('/changeStyle')
	.post(writeToStyleJson);

module.exports = StyleRouter;
