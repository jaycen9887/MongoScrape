var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var logger = require('morgan');

var Note = require('./models/Note.js');
var Article = require('./models/Article.js');

mongoose.Promise = Promise;

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(express.static(path.join(__dirname, "public")));


/* Mongo DB Connection */
mongoose.connect('mongodb://localhost/mongoScrape');

let db = mongoose.connection;

db.on('error', function(error){
    console.log("Mongoose Connection Error: ", error);
});

db.once('open', function(){
    console.log('Mongoose connection Successful');
});

/* Routes */
var routes = require('./routes/index.js')(app);
app.use('/', routes);

app.listen(port);
console.log('Server listening on port ' + port);