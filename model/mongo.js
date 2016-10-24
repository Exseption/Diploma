var mongoose = require('mongoose');


var db = mongoose.createConnection('mongodb://localhost/users');



var User = new mongoose.Schema( {
    id : {type: Number, index: true, min: 1},
    username: {type: String},
    password: {type: String}
});

var User = db.model("User", User);

var newUser = new User({id: 1
                        , username: 'Hulk'
                        , password: 'crash'});
newUser.save(function (error, item) {
    if (error) {
        console.log(error);
       } else {
        console.log(newUser.username + ' saved');
    }
});

db.on('open', function () {
    console.log('Это работает?');
    
    newUser.find(function (err, users) {
        console.log(users);
        
    })

});
