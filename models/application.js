var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    user = require('./user');

var Application = new Schema({
    title: { type: String },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    moderated: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: user }
});



Application.methods.findNotModerated = function () {
    return '$' + this.find({moderated: false})
};


module.exports = mongoose.model('Application',Application);