var express = require('express');
var app = express();
var indexRouter = require('../routes/index');
var homeRouter = require('../routes/home');
var authRouter = require('../routes/auth');
var usersRouter = require('../routes/users');
var logoutRouter = require('../routes/logout');

app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);

module.exports = app;