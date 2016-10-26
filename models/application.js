var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Application = new Schema({
    id: {type: Number},
    title: { type: String },
    body: { type: String },
    dateofpublic: { type: Date },
    author: { type: Number } ,
    moderated: { type: Boolean }
});

module.exports = mongoose.model('Application',Application);