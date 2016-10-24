var express = require('express'),
router = express.Router();

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

module.exports = router;
