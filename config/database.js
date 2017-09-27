//module.exports = {
    //'url' : 'mongodb://cocodinglive-shard-00-00-3ncwf.mongodb.net:27017,cocodinglive-shard-00-01-3ncwf.mongodb.net:27017,cocodinglive-shard-00-02-3ncwf.mongodb.net:27017/test?replicaSet=coCodingLive-shard-0" --authenticationDatabase admin --ssl --username jaycen9887 --password Mydeathkillsme1987!'

//}

var mongoose = require('mongoose');
var mongojs = require('mongojs');


var databaseUrl = 'mongoScrape';
var collections = ['Articles', 'Notes'];
var db = mongojs(databaseUrl, collections);

db.on('error', function(error){
    console.log("Database Error: " + error);
});

module.exports = db;







//mongoose.Promise = Promise;

//mongoose.connect('mongodb://mongodbuser:mongo@ds147884.mlab.com:47884/heroku_csddc6c9');

//var db = mongoose.connection;

//db.on('error', function(err){
    //console.log("Mongoose Error: " + err);
//});

//db.once('open', function(){
//    console.log("Mongoose Connected");
//});

module.exports = db;