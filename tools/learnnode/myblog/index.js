/**
 * @author: mefisto
 * @description:
 * @Date: 2016/11/4 18:25
 */
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    console.log('1');
    next();
});

app.use(function(req, res, next) {
    console.log('2');
    res.status(200).end();
});

app.listen(3000);