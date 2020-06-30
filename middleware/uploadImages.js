const multer = require("multer");
const path = require("path");
const util = require("util");
var Image = require('../models/Image');

var storage = multer.diskStorage({
	destination: function (req, file, callback){
		callback(null, path.join(`${__dirname}/../../imageUploads/`));
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname.toLowerCase().split(' ').join('-'));
	}
});

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// }
// const upload = multer({
// 			storage: storage,
// 			fileFilter: fileFilter
// 		});

var uploadFiles = multer({ storage: storage })
	.array("images", 20);

var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;

