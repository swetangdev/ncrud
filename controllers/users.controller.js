var usersSchema = require('../models/users.js');
var crypt = require('../utilities/crypt');
var config = require('../config');
var jwt = require('jsonwebtoken');

exports.create = function (req, res, next) {

    req.body.password = crypt().encrypt(req.body.password);
    var userObj = new usersSchema(req.body);
    userObj.save().then(user => {
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({ auth: true, token: token, 'message': 'User created Successfully' })
    })
        .catch(err => {
            res.status(400).send({ 'Error while creating user.': err });
        });
};

exports.update = function (req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User not found!!!' });
        } else {
            res.status(200).json('User updated');
        }
    })
};

exports.delete = function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User not found!!!' });
        } else {
            res.status(200).json('User deleted');
        }
    })
};

exports.list = function (req, res, next) {
    usersSchema.find((err, users) => {
        if (err) {
            return res.status(400).json({ message: 'Unable to fetch ussers!!!' });
        } else {
            res.status(200).send(users);
        }
    })
};

exports.search = function (req, res, next) {
    usersSchema.find({ $or: [{ firstname: { $regex: '.*' + req.params.s + '.*' } }, { lastname: { $regex: '.*' + req.params.s + '.*' } }] }, (err, users) => {
        if (err) {
            return res.status(400).json({ message: 'Unable to fetch ussers!!!' });
        } else {
            res.status(200).send(users);
        }
    })
};
