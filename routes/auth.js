var express = require('express');
var router = express.Router();
var usersSchema = require('../models/users.js');
var crypt = require('../utilities/crypt')
var jwt = require('jsonwebtoken');
var config = require('../config');
const message = require('../utilities/constants/constant');

router.get('/', function (req, res, next) {
    res.render('login', { title: 'login' })
});

router.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: message.user.userPassEmpty });
    } else {
        usersSchema.findOne({ email: req.body.username }).exec(function (err, user) {
            if (err) {
                return next(err);
            } else if (!user) {
                return res.status(401).json({ message: message.user.userNotRegistered });
            } else {

                if (req.body.password === crypt().decrypt(user.password)) {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: config.tokenExpireTime
                    });

                    res.status(200).send({ auth: true, token: token });
                } else {
                    res.status(200).send({ auth: false, message: message.user.passwordIncorrect });
                }
            }
        })
    }
});

module.exports = router;