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
const vapi = '/api/v1';

const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/legal');
app.get(vapi + '/questions', function (req, res) { // получаем вопросы
    sequelize
        .query('SELECT question.id, question.title, question.content, question.date_of_create, ' +
            'question.price, question.closed, question.payable, person.name, person.patronym, ' +
            'person.surname FROM public.person, public.question WHERE person.id = question.author ' +
            'ORDER BY question.date_of_create ASC;', {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
    })
});

app.get(vapi + '/question/:id', function (req, res) { // получаем вопрос по id
   sequelize.query('SELECT question.id, question.title, question.content, question.date_of_create, ' +
       'question.price, question.closed, question.payable, person.name, person.patronym,' +
       ' person.surname FROM public.person, public.question WHERE person.id = question.author AND  question.id = ' + req.params.id,
       {type: sequelize.QueryTypes.SELECT})
       .then(function (result) {
           res.send(result[0]);
       })
});

app.get(vapi + '/persons', function (req, res) { // получаем пользователей
    sequelize.query('SELECT * FROM person',
        {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get(vapi + '/person/:id', function (req, res) { // получаем пользователя по id
    sequelize.query('SELECT * FROM person AS p WHERE p.id = $1',
        { bind: [req.params.id],
            type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});
//чет подозрительна
app.get(vapi + '/:id/answers', function (req, res) { // получаем ответы к вопросу по id
    sequelize.query('SELECT a.*, p.name, p.patronym, p.surname FROM question AS q, ' +
        'answer AS a, person AS p  WHERE q.id = $1 ' +
        'AND a.question = $1 AND p.id = a.author',
        { bind: [req.params.id], type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
            console.log(result);
        })
});
app.post(vapi + '/auth', function (req, res) { // авторизация пользователя
    sequelize.query('SELECT * FROM person as p WHERE p.login = $1 AND p.password = $2',
        {bind: [req.body.login, req.body.pwd], type: sequelize.QueryTypes.SELECT}
    ).then(function (result) {
        res.send(result[0]);
    })
});
app.post(vapi + '/create/answer', function (req, res) { // создание ответа к вопросу
        sequelize.query('INSERT INTO answer ' +
            '(question, content, date_of_create, grade, author) ' +
            'VALUES ($1, $2, $3, $4, $5)', {
            bind: [
                req.body.id,
                req.body.answer,
                now(), null,
                req.body.author
            ],
            type: sequelize.QueryTypes.INSERT}
        ).then(function (results) {
            res.send('OK');
        }, function (error) {
            console.log(error);
        })
    });
app.post(vapi + '/vote/plus', function (req, res) { //голосуем за ответ в плюс
    sequelize.query('UPDATE public.answer SET grade=grade + 0.1 WHERE author=$1',
        { bind: [req.body.id],
            type: sequelize.QueryTypes.UPDATE}).then(function (res) {
        res.send('OK');
    })
});
app.post(vapi + '/vote/minus', function (req, res) { //голосуем за ответ в минус
    sequelize.query('UPDATE public.answer SET grade=grade - 0.1 WHERE author=$1',
        {bind: [req.body.id],
            type: sequelize.QueryTypes.UPDATE}).then(function (res) {
        res.send('OK');
    })
});

//select id from dialog where user1 = 1 OR user2 = 1
//select * from message where dialog = 1

app.get(vapi + '/:id/dialogs', function (req, res) {
    sequelize.query('select * from dialog where user1 = $1 OR user2 = $1',
        {
            bind: [req.params.id],
            type: sequelize.QueryTypes.SELECT
        }).then(function (results) {
        res.send(results);
    });
});


app.get(vapi + '/:id/dialog/:dialog/messages', function (req, res) {
   sequelize.query('select * from message as m, person as p where p.id = m.sended_by and m.dialog = $1 AND m.dialog in (select id from dialog where user1 = $2 OR user2 = $2)',
       {
           bind: [req.params.dialog, req.params.id],
           type: sequelize.QueryTypes.SELECT}).then(function (results) {
       res.send(results);
   })
});
app.post(vapi + '/create/question', function (req, res) { //создаем вопрос
    sequelize.query('INSERT INTO public.question(title, ' +
        'content, author, date_of_create, price, closed, payable)    ' +
        'VALUES ($1, $2, $3, now(), $4, false, $5)',
        {
            bind: [req.body.title, req.body.content, req.body.author, req.body.price, req.body.payable],
            type: sequelize.QueryTypes.INSERT
        })
        .then(function (result) {
            res.send(result)
        });




app.post(vapi + '/create/person', function (req, res) { // создаем нового пользователя
    // регистрация и из админки продумать
    sequelize.query('INSERT INTO public.person(login, password, surname, name, patronym, birthday, date_of_registration, active, rating, usergroup, telephone, area, city, country, document) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
        {bind: [
                req.body.login,
                req.body.password,
                req.body.surname,
                req.body.name,
                req.body.patronym,
                req.body.birthday,
                now(),
                true,
                null,
                'user',
                req.body.telephone,
                req.body.area,
                req.body.city,
                req.body.country,
                req.body.document
            ],
            type: sequelize.QueryTypes.INSERT
        })
        .then(function (result) {
            res.send(result)
        }).catch(function (error) {
        res.send('Opps, error!');
    })
})});



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
