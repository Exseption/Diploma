var mongoose = require('mongoose'),
application = require('../models/application'),
    Schema = mongoose.Schema;

var Answer = new Schema({
    body: { type: String },
    created: { type: String },
    application: { type: mongoose.Schema.Types.ObjectId
    ,ref: application },
    attachment: { type: String }
});

module.exports = mongoose.model('Answer', Answer);
