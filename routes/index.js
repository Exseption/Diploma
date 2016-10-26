var express = require('express'),
router = express.Router();

var isAuthenticated = function (req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports = function (passport) {

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash : true
    }));

    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/', function(req, res, next) {
        res.render('index', {
            user: req.user,

            title: 'Главная',
            longTitle: 'Очень длинный заголовок',
            questionTitle: 'Название вопроса',
            questionBody: 'Очень много текста',
            numberOfAnswers: '4'
        });
    });

    router.get('/about', function(req, res, next) {
        res.render('about', {
            user: req.user,
            title: 'О нас'
            , aboutBody: 'Очень много текста'
        });
    });

    router.get('/login', function(req, res, next) {
        res.render('login', {
            title: 'Войти',
        });
    });

    router.get('/register', function(req, res, next) {
        res.render('register', {
            title: 'Регистрация',
        });
    });

    router.get('/seminars', function(req, res, next) {
        res.render('seminars', {
            user:req.user,
            title: 'Семинары',
        });
    });

    router.get('/resources', function(req, res, next) {
        res.render('resources', {
            title: 'Ресурсы',
            user: req.user
        });
    });

    return router;
};

