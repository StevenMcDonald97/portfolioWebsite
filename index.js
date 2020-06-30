// User authoriation based on: https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();

// mongoose model
const User = require('./models/User.js');
const Image = require('./models/Image.js');

const imageRoutes = require('./routes/image');
const userRoutes = require('./routes/user');
const styleRoutes = require('./routes/style');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('imageUploads', express.static(process.cwd()+'/imageUploads'));
app.use('/image', imageRoutes);
app.use('/user', userRoutes);
app.use('/style', styleRoutes);

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


// return a secure page
app.get('/api/secret', function(req, res) {
  res.send('Secure');
});

// // check if the user has a valid token
// app.get('/checkToken', withAuth, function(req,res){
//   res.sendStatus(200);
// })


// An api endpoint that returns a list of routes for the site
app.get('/api/getRoutes', (req,res) => {
	var routes;
	fs.readFile('./pages.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  routes = JSON.parse(data);
      res.json(routes);

	});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.send('Invalid GET request');
});




app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});