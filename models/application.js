var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Application = new Schema({
    id: {type: Number},
    title: { type: String },
    body: { type: String, required: true },
    dateofpublic: { type: Date, default: Date.now() },
    author: { type: Number } ,
    moderated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Application',Application);