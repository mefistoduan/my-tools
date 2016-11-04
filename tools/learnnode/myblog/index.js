/**
 * @author: mefisto
 * @description:
 * @Date: 2016/11/4 18:25
 */

var express = require('express');
var app =express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use('/',indexRouter);
app.use('/users',userRouter);

app.listen(3000);