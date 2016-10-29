var User = require('../models/user'),
    apps = require('../models/application');


User.findOne({}, function (err, result) {
    console.log(result)
});

apps.find({}, function (err, results) {
    console.log(results);
});