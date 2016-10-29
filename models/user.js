var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    id: {type: Number},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    registrated: {type: Date, default: Date.now()},
    firstName: { type: String },
    secondName: {type: String},
    lastName: { type: String },
    userType: {type: String, enum: ['user', 'moder','lawyer'], required: true }

});

User.path('username').validate(function (v) {
    return v.length > 3 && v.length < 30;
});

module.exports = mongoose.model('User', User);