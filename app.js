
/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();
// var router = express.Router();
// var router = require("./models/router");
var setup = require("./routes/setup");
var group = require("./routes/group");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
// app.use(session({ resave: true,
//                   saveUninitialized: true,
//                   secret: 'uwotm8' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', setup.router);
app.use('/api/v1', group);


// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
