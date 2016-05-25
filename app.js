// Express Server hosts static files (for the moment copied from HW7)
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var db = require('./db/mongo.js');
var createStore = require('redux').createStore; // SERVER-SIDE STORE

var nextImageRouter = require('./middlewares/newImage.js');

var app = express();



// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// Host static files on URL path
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/*
Middleware was added to provide CORS support specifically for development.
BrowserSync  wraps the Express server (typically localhost server port 3000)
with a virtual server (we specify port 4000) that responds to changes in our code.
The issue encountered is that when using localhost:4000 - refered to from now
on as "4000" - we get some interesting problems. I use ajax requests from the
browser to ask the server for images. This works well until 4000 tries to execute
requests to localhost:3000 for images. We get a CORS issue - so for development purposes
we'll allow cross-browser requsts.
*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/newImage', nextImageRouter);

app.get('/', function (req, res) {
  res.render('index');
});

app.set('port', process.env.PORT || 3000);

// Start server
app.listen(app.get('port'), function () {
  console.log('Express game server listening on port 3000');
});

// ** ERROR ROUTERS **

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


module.exports = app;
