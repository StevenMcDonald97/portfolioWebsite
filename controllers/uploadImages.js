const upload = require("../middleware/uploadImages");

const multipleUpload = async (req, res) => {
  try {
    await upload(req, res);

    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.send(`Files has been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload. Max is 15 at a time");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};


// NEED TO INTEGRATE SAVING FILES INTO CODE!



// , (req, res, next)=> {
//     // NEED TO APPLY FOR EVERY IMAGE
//     console.log("SAVING IMAGE TO MONGO NOT IMPLEMENTED ONLY SAVES FIRST");
//     let newImage = new Image({
//       'name' : req.body[0].imageName,
//       'date' : "",
//       'size' : "",
//       'medium' : "",
//       'portfolio': ""
//     });

//     newImage.save()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({
//         success: true,
//         document: result
//       });
//     })
//     .catch((err) => next(err));
//   };
