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
            title: 'Главная',
            longTitle: 'Очень длинный заголовок',
            portalTitle: 'Название',
            questionTitle: 'Название вопроса',
            questionBody: 'Очень много текста',
            numberOfAnswers: '4'
        });
    });

    router.get('/about', function(req, res, next) {
        res.render('about', {
            title: 'О нас'
            , portalTitle: 'Название'
            , aboutBody: 'Очень много текста'
        });
    });

    router.get('/login', function(req, res, next) {
        res.render('login', {
            title: 'Войти',
            portalTitle: 'Название'
        });
    });

    router.get('/register', function(req, res, next) {
        res.render('register', {
            title: 'Регистрация',
            portalTitle: 'Название'
        });
    });

    router.get('/seminars', function(req, res, next) {
        res.render('seminars', {
            title: 'Семинары',
            portalTitle: 'Название'
        });
    });

    router.get('/resources', function(req, res, next) {
        res.render('resources', {
            title: 'Ресурсы',
            portalTitle: 'Название'
        });
    });

    return router;
};

