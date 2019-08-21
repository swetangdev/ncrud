const express = require('express');
const users = express.Router();
const userManip = require('../controllers/users.controller.js');


users.get('/', function (req, res, next) {
  res.redirect('/users/all');
});
users.get('/all/:page?/:limit?', function (req, res, next) {
  userManip().list(req, res, next);
});
users.get('/create', function (req, res, next) {
  userManip().createForm(req, res, next);
});
users.post('/create', function (req, res, next) {
  userManip().create(req, res, next);
});

users.put('/update/:id', function (req, res, next) {
  userManip().update(req, res, next);
});

users.get('/delete/:id', function (req, res, next) {
  userManip().delete(req, res, next);
});

users.get('/search/:s?', function (req, res, next) {
  userManip().search(req, res, next);
});

module.exports = users;
