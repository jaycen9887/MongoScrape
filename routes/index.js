module.exports = function(app){
    var express = require('express');
    var router = express.Router();
    var cheerio = require('cheerio');
    var request = require('request');
    var Article = require('../models/Article');
    var Note = require('../models/Note');

    router.get('/', function(req, res){
        res.render('index');
    }); 

    router.get('/saved', function(req, res){
        res.render('saved');
    });

    router.get('/savedArticles', function(req, res) {
        Article.find({'saved': true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                res.json(doc);
            }
        });
    });

    router.get('/scrape', function(req,res){
        request('http://www.echojs.com/', function(error, response, html) {
            const $ = cheerio.load(html);

            $('article h2').each(function(i, element) {
                let result = {};

                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');
                result.summary = "This is a test";
                result.exprience = "Test Test Test Test";
                result.saved = false;

                let entry = new Article(result);

                entry.save(function(err, doc) {
                    if(err) {
                        console.log(err);
                        //res.send(err);
                    } else {
                        console.log(doc);
                        //res.send(doc);
                    }
                });
            });
        });
     res.redirect('/');
    });

    router.get('/articles', (req, res) => {
        Article.find({}, (error, doc) => {
            if(error){
                console.log(error);
            } else {
                res.json(doc);
            }
        }); 
    });

    router.get('/articles/:id', (req, res) => {
        Article.findOne({'_id': req.params.id}).populate('note').exec((error, doc) => {
            if(error){
                console.log(error);
            } else {
                res.json(doc);
            }
        });
    });

    router.post('/articles/:id', (req, res) => {
        var newNote = new Note(req.body);
        newNote.save((error, doc) => {
            if(error){
                console.log(error);
            }else {
                Article.findOneAndUpdate({'_id': req.params.id}, {"note": doc._id}).exec((err, doc) => {
                    if(err) {
                        console.log(err);
                    }else {
                        res.send(doc);
                    }
                });
            }
        });
    });

    router.post('/save/:id', (req,res) => {
        Article.findOneAndUpdate({'_id': req.params.id}, {'saved': true},(err, doc) => {
            if(err){
                console.log(err);
            } else {
                res.send(doc);
            }
        }); 
    });

    router.post('/delete/:id', (req, res) => {
        Article.findOneAndUpdate({'_id': req.params.id}, {'saved': false}, (err, doc) => {
            if(err){
                console.log(err);
            } else {
                res.send(doc);
            }
        });
    });
    return router;

}