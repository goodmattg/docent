// var getImage = require('./public/helpers/getImage.js');
// var fillCache = require('./public/helpers/fillCache.js');
// var initialCondition = require('./public/initialCondition/initialCondition.js');

// var init = initialCondition();

// init.then(function (result) {
//   console.log(JSON.stringify(result));
// });

// Simple Express server to serve static files
var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);

// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// Host static files on URL path
app.use(express.static(path.join(__dirname, 'public')));

// Use express Router middleware for root path
// app.use(app.router);

app.get('/', function (req, res) {
  res.render('index');
});

// Start server
app.listen(app.get('port'), function () {
  console.log('Express game server listening on port ' + port);
});

// new
