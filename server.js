var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var routes = require('./routes/index');

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/', routes);

app.listen(port);
console.log('Server listening on port ' + port);