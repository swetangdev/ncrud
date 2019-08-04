var express = require('express');
var router = express.Router();
var usersSchema = require('../models/users.js');
var crypt = require('../utilities/crypt')
var jwt = require('jsonwebtoken');
var config = require('../config');
var session = require('express-session');

router.get('/', function(req, res, next) {
    res.render('login', {title: 'login'})
});

router.post('/', function(req, res, next){
    var userObj = new usersSchema(req.body);
    if(!req.body.username || !req.body.password){
        return res.status(400).send({ message: 'Username or password not valid or empty.' });
    } else {   
        usersSchema.findOne({ username: req.body.username }).exec(function(err, user) {
            if (err) {
                return next(err);
            } else if(!user){
                return res.status(401).json({ message: 'Sorry username is not registered!!!' });
            } else {
                // console.log(crypt().decrypt(user.password));
                    
                if(req.body.password === crypt().decrypt(user.password)){
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 240 // expires in 4 minutes
                    });
                    // req.session.username = user.username;
                    // req.session.token = token;
                    // res.redirect('/users', { user: user.username, token: token, 'message': 'Success login' });
                    
                    res.status(200).send({auth: true, token: token});
                } else {
                    res.status(200).send({auth: false, message: 'Password is incorrect'});
                }
            }
        })
    }
});

module.exports = router;