var express = require('express'),
    Application = require('../models/application'),
    User = require('../models/user'),
    Doc = require('../models/doc'),
    router = express.Router();

var isAuthenticated =  (req, res, next)=> {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports =  (passport) => {
    //главная страница
    router.get('/', (req, res, next) => {
        Application.find({moderated:false}, (err, results) => {
            res.render('index', {
                title: 'Главная',
                user: req.user,
                applications: results
            });
            console.log(res.statusCode);
        });
    });
    //запрос на удаление вопроса
    router.post('/delete/:id',  (req, res) => {
        Application
            .remove({ _id:req.params.id })
            .exec(function (err, results) {
                if (err)
                    throw err;
                console.log(results);
                res.redirect(301,'/home');
            })
    });
    //добавил простое добавление вопроса
    router.post('/addapp',  (req, res) => {
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



    router.get('/login', (req, res, next) => {
        res.render('login', {
            title: 'Войти',
            message: req.flash('message')
        });
    });
    
    
    
    router.get('/signup', (req, res) => {
        res.render('register',{
            message: req.flash('message')
        });
    });
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));
    router.get('/home', isAuthenticated, (req, res) => {
        res.render('home', {
            user: req.user
        });
    });
    router.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    router.get('/about', (req, res, next)=> {
        res.render('about', {
            user: req.user,
            title: 'О нас',
            aboutBody: 'Очень много текста'
        });
    });
    
    router.get('/register', (req, res, next) => {
        Doc
        .find({})
        .exec(function (err, results) {
            if (err)
                throw err;
            res.render('register', {});
        });
    });
    router.get('/seminars', (req, res, next) => {
        res.render('seminars', {
            user:req.user,
            title: 'Семинары'
        });
    });
    router.get('/resources', (req, res, next) => {
        res.render('resources', {
            title: 'Ресурсы',
            user: req.user
        });
    });
    //получить отдельный вопрос
    router.get('/application/:id',  (req, res) => {
       Application
           .find({ _id : req.params.id })
           .exec((err, result) => {
               if(err) throw err;
              res.render('application',{
                  title :result.title,
                  application: result
              });
           });
    });
    router.post('/purse-inc', (req, res) => {
        User
        .update({_id : req.user._id}, {$inc: { purse: parseInt(req.body.pursesum) }})
            .exec(function(err, result){
               if (err){
                   throw err;
               }
                res.redirect(301, '/home');
                console.log(result);
            });

   });
    //страница редактирования/удаления?
    router.get('/test-del', (req, res) => {
        Application
            .find({ author: req.user._id })
            .exec(function (err, results) {
                res.render('edit-application', {
                    applications: results,
                    user: req.user
                })
            });
    });
    //почему-то сортировка и условие запроса не работает чтоли
    router.get('/main-list', (req, res) => {
        Application
            .find({moderated: false})
            .sort({created: -1})
            .exec(function (err, results) {
                if (err)
                throw err;
            res.render('main-list', {
                applications: results
            })
        });
    });
    router.post('/home/profile',isAuthenticated,  (req, res) => {
       res.render('profile', {
           user: req.user

       })
    });
    router.get('/home/applications',isAuthenticated,  (req, res) => {
        res.render('applications', {
            user: req.user
        })
    });
    return router;
};