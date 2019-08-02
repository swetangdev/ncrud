var express = require('express');
var router = express.Router();
var verifyToken = require('../utilities/verifyToken');
const userManip = require('../controllers/users.controller.js');

router.get('/', verifyToken, function (req, res, next) {
  res.redirect('/users/all');
});
router.get('/all', verifyToken, function (req, res, next) {
  userManip.list(req, res, next);
});
router.post('/create', function (req, res, next) {
  userManip.create(req, res, next);
});

router.put('/update/:id', verifyToken, function (req, res, next) {
  userManip.update(req, res, next);
});

router.get('/delete/:id', verifyToken, function (req, res, next) {
  userManip.delete(req, res, next);
});

router.get('/search/:s', verifyToken, function (req, res, next) {
  userManip.search(req, res, next);
});

module.exports = router;
