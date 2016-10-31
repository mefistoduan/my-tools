/**
 * Created by mefisto on 2016/10/31.
 */

var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var fs = require('fs');


var app = express();

app.get('/',function(req,res,next){
    superagent.get('http://www.emeixian.com/sitemap.php')
        .end(function(err,sres){
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            var headPart = 'http://www.emeixian.com/'
            $('.nav_cont li a').each(function(idx,element){
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: headPart+$element.attr('href')
                })
            })

            res.send(items);

            //不知道为啥object解析的不对
            var resultTitle = items.toString();
            fs.writeFile('./test.txt',resultTitle,function(err){
                if(err) throw err;
                console.log('it is ok!');
            });

        })
});

app.listen(3000, function () {
    console.log('app is listening at port 3000');
});