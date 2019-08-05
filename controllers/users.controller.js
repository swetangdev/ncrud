var usersSchema = require('../models/users.js');
var crypt = require('../utilities/crypt');
var config = require('../config');
var jwt = require('jsonwebtoken');

exports.create = function (req, res, next) {
    var filestatus = '';

    if (!req.body.username || !req.body.password) {
        res.status(200).json({ 'message': 'Username and password both are required' });
    }
    if (req.files && Object.keys(req.files).length > 0) {
        // return res.status(400).send('No files were uploaded.');
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.profilepicture;
        req.body.profilepicture = sampleFile.name;
        sampleFile.mv('./public/userphotos/' + sampleFile.name, function (err) {
            if (err)
                return res.status(500).send(err);

            filestatus = ' - File uploaded!';
        });
    }
    req.body.password = crypt().encrypt(req.body.password);
    var userObj = new usersSchema(req.body);
    userObj.save().then(user => {
        // create a token
        // var token = jwt.sign({ id: user._id }, config.secret, {
        //     expiresIn: 86400 // expires in 24 hours
        // });
        res.status(200).json({ 'message': 'User created Successfully' + filestatus })
    })
        .catch(err => {
            res.status(400).send({ 'Error while creating user.': err });
        });
};
exports.createForm = function (req, res, next) {
    res.render('createForm', { title: 'Create a user' });
};

exports.update = function (req, res, next) {
    if (req.body.password) {
        req.body.password = crypt().encrypt(req.body.password);
    }
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
    var perPage = parseInt(req.params.limit);
    var page = Math.max(0, req.params.page);
    usersSchema.find((err, users) => {
        if (err) {
            return res.status(400).send({ message: 'Unable to fetch ussers!!!', err: err });
        } else {
            res.status(200).send(users);
        }
    }).skip(perPage * page).limit(perPage).sort({
        username: 'asc'
    });
};

exports.search = function (req, res, next) {
    usersSchema.find({ $or: [{ firstname: { $regex: '.*' + req.params.s + '.*' } }, { lastname: { $regex: '.*' + req.params.s + '.*' } }] }, (err, users) => {
        if (err) {
            return res.status(400).json({ message: 'Unable to fetch ussers!!!' });
        } else {
            res.status(200).send(users);
        }
    }).catch(err => console.log('Caught: ', err.message));

};
