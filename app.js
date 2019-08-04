var createError = require('http-errors');
var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var logoutRouter = require('./routes/logout');
var db = require('./db');
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
  secret: 'any random key',
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: db
  })
}));
app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
