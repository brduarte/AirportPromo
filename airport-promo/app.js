const path = require('path');
const logger = require('morgan');
const express = require('express');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function (error, req, res, next) {
  res.status(error.status)

  res.json({
    status: error.status,
    message: error.message,
  })
})


module.exports = app;
