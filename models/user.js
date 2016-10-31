var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    registrated: {type: Date, default: Date.now()},
    firstName: { type: String },
    secondName: {type: String},
    lastName: { type: String },
    userType: { type: String, enum: ['user', 'moder','lawyer'], default:'user' },
    purse: { type: String }


});

module.exports = mongoose.model('User', User);