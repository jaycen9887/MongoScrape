var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/Article');
var scraper = require('../controller/scrape');

router.get('/', function(req, res){
    res.render('index');
});

router.get('/saved', function(req, res){
    res.render('saved');
});

router.get('/scrape', function(req,res){
    request('https://www.reddit.com/r/webdev', function(err, resp, html){
        var $ = cheerio.load(html);

        var results = [];

        $('figure.rollover').each(function(i, element){
            var imgLink = $(element).find('a').find('img').attr(srcset).split(',')[0].split(' ')[0];
            results.push({link: imgLink});
        });
    });
});

	module.exports = router;