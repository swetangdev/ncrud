// var createError = require('http-errors');
var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var routing = require('./routing/routing');
var db = require('./db');
var config = require('./config');
var handle500 = require('./utilities/errorHandling/handle500');
var handle404 = require('./utilities/errorHandling/handle404');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: db
  })
}));
app.use(routing);
// catch 404 and forward to error handler
app.use(handle404);
// error handler
app.use(handle500);

module.exports = app;
