const express = require('express'),
path = require('path'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
app = express();
const Sequelize = require('sequelize');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(session({
                  secret: '_secret$-#=key',
                  resave: false,
                  saveUninitialized: false
                }));

app.disable('x-powered-by');
const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/legal');

app.get('/api/v1/questions', function (req, res) {
    sequelize
        .query('SELECT q.* FROM question AS q', {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
    })
});

app.get('/api/v1/resources', function (req, res) { // получаем все ресурсы
    sequelize
        .query('SELECT r.* FROM resource AS r', {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get('/api/v1/question/:id', function (req, res) { // получаем вопрос по id
   sequelize.query('SELECT * FROM question WHERE id = ' + req.params.id,
       {type: sequelize.QueryTypes.SELECT})
       .then(function (result) {
           res.send(result[0]);
       })
});

app.get('/api/v1/users', function (req, res) { // получаем пользователей
    sequelize.query('SELECT * FROM "user"',
        {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get('/api/v1/user/:id', function (req, res) { // получаем пользователя по id
    sequelize.query('SELECT * FROM "user" AS u WHERE u.id = $1',
        { bind: [req.params.id],
            type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get('/api/v1/:id/answers', function (req, res) { // получаем ответы к вопросу
    sequelize.query('SELECT a.*, u.name, u.patronym, u.surname FROM question AS q, ' +
        'answer AS a, "user" AS u  WHERE q.id = $1 ' +
        'AND a.question = $1 AND u.id = a.author',
        { bind: [req.params.id], type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
            console.log(result);
        })
});


app.post('/api/v1/auth', function (req, res) { // авторизация пользователя
    sequelize.query('SELECT * FROM "user" as u WHERE u.login = $1 AND u.password = $2',
        {bind: [req.body.login, req.body.pwd], type: sequelize.QueryTypes.SELECT}
    ).then(function (result) {
        res.send(result[0]);
    })
});

app.post('/api/v1/create/answer', function (req, res) { // создание ответа к вопросу
    var count = 0;
    sequelize.query('SELECT COUNT(a.*) FROM answer AS a WHERE a.question = $1',
        {
            bind: [req.body.id],
            type: sequelize.QueryTypes.SELECT }).then(function (result) {

        count = result[0].count;
        sequelize.query('INSERT INTO answer (id, question, content, date_of_create, grade, author) VALUES ($1, $2, $3, $4, $5, $6);', {
            //авторство установить
            bind: [count + 1, req.body.id, req.body.answer, '2017-03-11', 0, 1], type: sequelize.QueryTypes.INSERT}
        ).then(function (results) {
            res.send('OK');
        }, function (error) {
            console.log(error);
        })
    })
});

app.post('api/v1/vote', function (req, res) { //голосуем за ответ
    sequelize.query('UPDATE public.answer SET grade=grade + 0.1 WHERE author=1',
        {type: sequelize.QueryTypes.UPDATE}).then(function (res) {
        res.send('OK');
    })
});

app.get('/api/v1/create/1/messages', function (req, res) { // получить сообщения
   sequelize.query('SELECT * FROM message as m WHERE m.dialog in (SELECT m.dialog FROM message as m WHERE m.author=1',
       {type: sequelize.QueryTypes.SELECT}).then(function (results) {
       res.send(results);
   })
});

app.post('/api/v1/create/question', function (req, res) { //создаем вопрос
    var title = req.body.title;
    var body = req.body.body;
    var payable = req.body.payable;
    var price= req.body.price;
    sequelize.query('INSERT INTO public.question(title, content, author, date_of_create, price, closed, payable)    VALUES ($1, $2, $3, now(), $4, false, $5);',
        {bind: [title, body, 1, '',1000,''], type: sequelize.QueryTypes.INSERT})
        .then(function (result) {
        res.send(result)
    })
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});
module.exports = app;
