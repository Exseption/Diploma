var mongoose = require('mongoose');

module.exports = mongoose.model('Application',{
    id: Number,
    title: String,
    body: String,
    dateOfpublic: Date,
    author: Number
});