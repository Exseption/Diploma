var express = require('express'),
    Application = require('../models/application'),
    User = require('../models/user'),
    router = express.Router();

var isAuthenticated = function (req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
};

var isModer = function (req, res, next) {

        if(req.user.userType == 'moder')
            return next();
        res.redirect('/');
};

module.exports = function (passport) {



    router.get('/main-list', function (req, res) {
        Application.find({}, function (err, results) {
                if (err)
                throw err;
            res.render('main-list', {
                applications: results
            })
        });
    });

    router.post('/home/profile',isAuthenticated, function (req, res) {
       res.render('profile', {
           user: req.user
           
       }) 
    });

    router.post('/home/applications',isAuthenticated, function (req, res) {
        res.render('applications', {
            user: req.user

        })
    });
    //тестим работу ролевого доступа
    router.get('/test1',isModer, function (req, res) {
        res.render('test1',{ test1: 'Meeeee!',
        user: req.user})
    });
    //добавил простое добавление статей
    router.post('/addapp', function (req, res) {
        var newApp = new Application();
        newApp.title = req.body.title;
        newApp.body = req.body.body;
        newApp.created = new Date();
        newApp.author = req.body.author;
        newApp.save(function (err) {
            if (err){
                console.log('Ошибка при добавлении вопроса');
                throw err;
            }
            console.log('Добавлен вопрос' + newApp);
            res.send({success: true});

        })
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login',
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
        Application.find({moderated:false},function (err, results) {
            res.render('index', {
                title: 'Главная',
                
                user: req.user,
                longTitle: 'Очень длинный заголовок',
                applications: results
            }); 
            console.log(res.statusCode);
        });
    });
    router.get('/main', function (req, res, next) {
        res.render('main');
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
            title: 'Семинары'
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