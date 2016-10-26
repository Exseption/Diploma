var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Application = new Schema({
    id: Number,
    title: String,
    body: String,
    dateofpublic: Date,
    author: Number
});

module.exports = mongoose.model('Application',Application);