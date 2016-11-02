var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Doc = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
});

module.exports = mongoose.model('Doc', Doc);