var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    id: Number,
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});