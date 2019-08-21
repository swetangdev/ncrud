var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    phone: String,
    profilepicture: String,
    isActive: { type: Boolean, default: 0 }
}, {
        timestamps: true
    });

module.exports = mongoose.model('users', postSchema);