
var userHandle = function () {
    var usersSchema = require('../models/users.js');
    var crypt = require('../utilities/crypt');
    const userConstant = require('../utilities/constants/constant');

    this.create = (req, res, next) => {
        var filestatus = '';

        if (!req.body.username || !req.body.password) {
            res.status(200).json({ message: userConstant.user.userOrPasswordRequired });
        } else {
            usersSchema.findOne({ email: req.body.email }).exec(function (err, user) {
                if (err) {
                    return next(err);
                } else if (user) {
                    return res.status(200).json({ message: userConstant.user.alreadyRegistered });
                }
            })
        }
        if (req.files && Object.keys(req.files).length > 0) {
            // return res.status(400).send('No files were uploaded.');
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            let sampleFile = req.files.profilepicture;
            req.body.profilepicture = sampleFile.name;
            sampleFile.mv(userConstant.assets.userPhotosDir + sampleFile.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                filestatus = userConstant.user.filestatus;
            });
        }
        req.body.password = crypt().encrypt(req.body.password);
        var userObj = new usersSchema(req.body);
        userObj.save().then(user => {
            res.status(200).json({ message: userConstant.user.created + filestatus })
        }).catch(err => {
            res.status(400).send({ 'Error while creating user.': err });
        });
    };

    this.createForm = function (req, res, next) {
        res.render('createForm', { title: userConstant.user.createTitle });
    };

    this.update = function (req, res, next) {
        if (req.body.password) {
            req.body.password = crypt().encrypt(req.body.password);
        }
        usersSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
            if (err) {
                return res.status(400).json({ message: userConstant.user.notFound });
            } else {
                res.status(200).json(userConstant.user.updated);
            }
        })
    };

    this.delete = function (req, res, next) {
        usersSchema.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                return res.status(400).json({ message: userConstant.user.notFound });
            } else {
                res.status(200).json(userConstant.user.deleted);
            }
        })
    };

    this.list = function (req, res, next) {
        var perPage = parseInt(req.params.limit);
        var page = Math.max(0, req.params.page);
        usersSchema.find((err, users) => {
            if (err) {
                return res.status(400).send({ message: userConstant.user.fetchError, err: err });
            } else {
                if (!users.length) {
                    return res.status(200).send({ message: userConstant.common.notFound });
                }

                res.status(200).send(users);
            }
        }).skip(perPage * page).limit(perPage).sort({
            username: 'asc'
        }).then();
    };

    this.search = function (req, res, next) {
        usersSchema.find({ $or: [{ firstname: { $regex: '.*' + req.params.s + '.*' } }, { lastname: { $regex: '.*' + req.params.s + '.*' } }] }, (err, users) => {
            if (err) {
                return res.status(400).json({ message: userConstant.user.fetchError });
            } else {
                if (!users.length) {
                    return res.status(200).send({ message: userConstant.common.notFound });
                }
                res.status(200).send(users);
            }
        }).catch(err => console.log('Caught: ', err.message));

    }
};
module.exports = function () {
    return new userHandle();
};