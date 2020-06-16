const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

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
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});