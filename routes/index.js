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

    router.get('/scrape', function(req, res){
        request('http://www.theonion.com/', function(error, response, html) {
            const $ = cheerio.load(html);

            $('article.summary').each(function(i, element){
                let result = {};
                
                result.title = $(this).find('header').find('a').attr('title');
                result.date = $('this').find('a').attr('data-pubdate');
                result.img = $(this).find('noscript').children('img').attr('src');
                result.link = "theonion.com" + $(this).find('a').attr('href');
                result.description = $(this).find('div.desc').text().trim();

                let entry = new Article(result);

                console.log(result);

                entry.save(function(err, doc){
                    if(err){
                        console.log(err);
                    } else {
                        res.send(doc)
                    }
                });
            });
        });
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

     router.get('/notes/:id', (req, res) => {
        let id = req.params.id;
        Article.find({'_id': id}, '_id note title', function(error, doc) {
            if(error){
                console.log(error);
            } else {
                res.json(doc);
               
            }
        });  
    }); 

    router.post('/notes/:id', function(req,res) {
        let id = req.params.id;
        let newNote = req.body.newNote;

        Article.findOneAndUpdate({'_id': id},{'$push': {'note': newNote}}, function(error, doc){
            if(error){
                console.log(error);
            } else {
                res.json(doc);
            }
        });
    }); 

    return router;

}
