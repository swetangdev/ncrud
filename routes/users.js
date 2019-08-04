const express = require('express');
const router = express.Router();
const userManip = require('../controllers/users.controller.js');

router.get('/', function (req, res, next) {
  res.redirect('/users/all');
});
router.get('/all/:page?/:limit?', function (req, res, next) {
  userManip.list(req, res, next);
});
router.get('/create', function (req, res, next) {
  userManip.createForm(req, res, next);
});
router.post('/create', function (req, res, next) {
  userManip.create(req, res, next);
});

router.put('/update/:id', function (req, res, next) {
  userManip.update(req, res, next);
});

router.get('/delete/:id', function (req, res, next) {
  userManip.delete(req, res, next);
});

router.get('/search/:s?', function (req, res, next) {
  userManip.search(req, res, next);
});

module.exports = router;
