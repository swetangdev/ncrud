var express = require('express');
var router = express.Router();
const verifyToken = require('../utilities/verifyToken');
var usersSchema = require('../models/users.js');
const userConstant = require('../utilities/constants/constant');
/* GET home page. */
router.get('/', verifyToken, function (req, res, next) {
  usersSchema.findById('req.userId', { password: 0 }, function (err, user) {
    if (err) {
      return res.status(403).send({ message: userConstant.common.wentWrong });
    }
    if (!user) {
      return res.status(404).send({ message: userConstant.user.notFound });
    }
    res.status(200).send({ title: "Welcome", user: user.firstname + ' ' + user.lastname });
  });


});

module.exports = router;
