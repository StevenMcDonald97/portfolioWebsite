// USer authoriation based on: https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const User = require('./models/User.js');
const secret = 'asecretphrase';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

// return the home page
app.get('/api/home', function(req, res) {
  res.send('Home');
});

// return a secure page
app.get('/api/secret', function(req, res) {
  res.send('Secure');
});

// check if the user has a valid token
app.get('/checkToken', withAuth, function(req,res){
  res.sendStatus(200);
})


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

// api end point to handle a new user registering
app.post('/api/register', function(req, res){
  console.log("here");
  const {name, email, password} = req.body;
  const user = new User({ name, email, password});
  user.save(function(err){
    if(err) {
      res.status(500).send("Error creating user please try again");
    } else {
      res.status(200).send("Success!");
    }
  });
});

// api endpoint to handle authenticaating user loging in
app.post('/api/authenticate', function(req, res) {

  const { email, password } = req.body;
          console.log(req.body);

  User.findOne({ email }, function(err, user) {
    if (err) {
        console.log("1");

      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
              console.log("2");

      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
              console.log("3");

      user.isCorrectPassword(password, function(err, same) {
        if (err) {
                  console.log("4");

          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
                  console.log("5");

          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
                  console.log("6");

          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});


app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});