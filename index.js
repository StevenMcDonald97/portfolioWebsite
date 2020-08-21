// User authoriation based on: https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// mongoose model
// const User = require('./models/User.js');
// const Image = require('./models/Image.js');

const imageRoutes = require('./routes/image');
const userRoutes = require('./routes/user');
const styleRoutes = require('./routes/style');
const emailRoutes = require('./routes/email');
const uploadRoutes = require('./routes/upload');

const page = require("./models/Page")
const homePage = require("./home.json")
const textPage = require('./models/TextPage');
const  {listPage, listObject} = require('./models/ListPage');
const portfolio = require('./models/Portfolio');
const Image = require('./models/image');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('imageUploads', express.static(process.cwd()+'/imageUploads'));
app.use('/image', imageRoutes);
app.use('/user', userRoutes);
app.use('/style', styleRoutes);
app.use('/email', emailRoutes);
app.use('/upload', uploadRoutes);
app.use(cors());

const mongo_uri = 'mongodb://localhost/react-auth';

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/*API end point to return the information for a single page*/
app.get('/api/getPage', (req,res) => {
	var pageId = (req.query.pageId);
  var pageType = (req.query.pageType);

  if (pageType==="text"){
      textPage.findById(pageId).lean().exec(
      function (err, textPage) {  

          res.send(textPage);
      }); 
  } else if (pageType==="list"){
    listPage.findById(pageId).lean().exec(
      function (err, listPage) {         
          res.send(listPage);
      }); 
  } else if (pageType==="portfolio"){
    portfolio.findById(pageId).lean().exec(
    function (err, portfolioPage) {         
        res.send(portfolioPage);
    }); 
  }
    
});

/*API end point to return a list of page titles and ids*/
app.get('/api/getPageInfo', (req,res) => {
  page.find().lean().exec(
      function (err, pages) {  
          res.send(pages);
      });     
});

app.get('/api/getPortfolioImages', (req, res)=>{
  let images = [];
  req.query.imageNames.forEach((image, index)=>{

      Image.find({fileName:imageName}).lean().exec(
        function (err, img) {  
          images.push(img)
        }
      ); 
      if (images.length==req.query.imageNames.length) { res.send(images)};
    })
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.send('Invalid GET request');
});

app.post('*', (req,res) =>{
    res.send('Invalid POST request');
});

app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});