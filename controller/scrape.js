/* REQUIRES */
var cheerio = require('cheerio');
var request = require('request');

/* URL to be scraped */
var url = 'https://www.indeed.com/jobs?q=full+stack+developer&l=North+Carolina';

function scrapeSite(cb){
    request(url, function(err, response, html){
        if (err) throw err;

        /* Load the html into cheerio's shorthand selector */
        var $ = cheerio.load(html);

        /* Target items wanted by their tags */
        $('.result .summary .experienceList').each(function(i, element){
            console.log($(element));

            var scrapeSite = new Article (
                {
                    title: title,
                    link: link
                });
        });
    });
}