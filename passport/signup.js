var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {

                findOrCreateUser = function(){
                    User.findOne({ 'username' :  username }, function(err, user) {
                        if (err){
                            console.log('Ошибка: '+err);
                            return done(err);
                        }
                        if (user) {
                            console.log('Пользователь с таким логином уже существует: '+username);
                            return done(null, false, req.flash('message','Пользователь уже существует'));
                        } else {
                            var newUser = new User();

                            newUser.username = username;
                            newUser.password = createHash(password);
                            newUser.email = req.param('email');
                            newUser.firstName = req.param('firstName');
                            newUser.lastName = req.param('lastName');

                            newUser.save(function(err) {
                                if (err){
                                    console.log('Ошибка пользователя: '+err);
                                    throw err;
                                }
                                console.log('Регистрация пользователя прошла упешно');
                                return done(null, newUser);
                            });
                        }
                    });
                };
                process.nextTick(findOrCreateUser);
            })
    );

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

};