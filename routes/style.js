
const express = require('express');
const StyleRouter = express.Router();
const fs = require('fs');
const fileName = __dirname +'/../client/src/App/style.json';
const file = require(fileName);
const cssFileName = __dirname +'/../client/src/App/_custom.scss';
const cssFile = require(cssFileName);
const writeToStyleJson = async function(req, res) {
		let styleObject = req.body;
		let styleJson = JSON.stringify(styleObject, null, 2);
		await fs.writeFile(fileName, styleJson, (err) => {
		    if (err) console.log(err);
		    console.log('Data written to file');
		});

		let cssString = `
		$titleColor:${ styleObject.text.WebsiteTitle.color };\n
		$titleSize:${ styleObject.text.WebsiteTitle.size };	\n
		$pageHeaderColor:${ styleObject.text.PageHeader.color };\n
		$pageHeadersize:${ styleObject.text.PageHeader.size };\n
		$mediumHeaderColor:	${ styleObject.text.MediumHeader.color };\n
		$mediumHeaderSize:	${ styleObject.text.MediumHeader.Size };\n
		$smallHeaderColor:	${ styleObject.text.SmallHeader.color };\n
		$smallHeaderSize:${ styleObject.text.SmallHeader.size };\n
		$bodyTextColor:	${ styleObject.text.BodyText.color }\n
		$bodyTextSize:	${ styleObject.text.BodyText.size }\n
		$navLinkColor:	${ styleObject.text.NavigationLink.color }\n
		$navLinkSize:	${ styleObject.text.NavigationLink.size }\n	
		$otherLinkColor:${ styleObject.text.OtherLink.color }	\n
		$hoverOnLinkColor:${ styleObject.text.HoverOnLink.color }	\n
		$objectTextColor:${ styleObject.text.ObjectText.color }	\n
		$objectTextSize:	${ styleObject.text.ObjectText.size }\n
		$titleBackgroundColor: ${ styleObject.backgroundColor.title }\n
		$headerBackgroundColor: ${ styleObject.backgroundColor.header }\n
		$navigationBackgroundColor:${ styleObject.backgroundColor.navigation } \n
		$bodyBackgroundColor:${ styleObject.backgroundColor.body } \n
		$emphasisBackgroundColor:${ styleObject.backgroundColor.emphasis } \n
		$objectBackgroundColor:${ styleObject.backgroundColor.object }\n
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
