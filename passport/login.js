var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('login', new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {
                User.findOne({ 'username' :  username },
                    function(err, user) {
                        if (err)
                            return done(err);
                        if (!user){
                            console.log('Пользователь с таким логином не найден '+username);
                            return done(null, false, req.flash('message', 'Пользователь не найден'));
                        }
                        if (!isValidPassword(user, password)){
                            console.log('Invalid Password');
                            return done(null, false, req.flash('message', 'Некорректный пароль')); // redirect back to login page
                        }
                        return done(null, user);
                    }
                );

            })
    );
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
};