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

app.get('/api/v1/resources', function (req, res) {
    sequelize
        .query('SELECT r.* FROM resource AS r', {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get('/api/v1/question/:id', function (req, res) {
   sequelize.query('SELECT * FROM question WHERE id = ' + req.params.id,
       {type: sequelize.QueryTypes.SELECT})
       .then(function (result) {
           res.send(result[0]);
       })
});

app.get('/api/v1/users', function (req, res) {
    sequelize.query('SELECT * FROM "user"',
        {type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get('/api/v1/user/:id', function (req, res) {
    sequelize.query('SELECT * FROM "user" AS u WHERE u.id = $1',
        { bind: [req.params.id],
            type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
        })
});

app.get('/api/v1/:id/answers', function (req, res) {
    sequelize.query('SELECT a.*, u.name, u.patronym, u.surname FROM question AS q, ' +
        'answer AS a, "user" AS u  WHERE q.id = $1 ' +
        'AND a.question = $1 AND u.id = a.author',
        { bind: [req.params.id], type: sequelize.QueryTypes.SELECT})
        .then(function (result) {
            res.send(result);
            console.log(result);
        })
});


app.post('/api/v1/auth', function (req, res) {
    sequelize.query('SELECT * FROM "user" as u WHERE u.login = $1 AND u.password = $2',
        {bind: [req.body.login, req.body.pwd], type: sequelize.QueryTypes.SELECT}
    ).then(function (result) {
        res.send(result[0]);
    })
});

app.post('/api/v1/create/answer', function (req, res) {
    var count = 0;
    sequelize.query('SELECT COUNT(*) FROM answer', {type: sequelize.QueryTypes.SELECT}).then(function (result) {
        count = result;
        sequelize.query('INSERT INTO answer (id, question, content, date_of_create, ' +
            'rating, author) VALUES ($1, $2, $3, $4, $5, $6);', {
            //авторство установить
            bind: [count + 1, req.body.id, req.body.answer, new Date(), 0, 1], type: sequelize.QueryTypes.INSERT}
        ).then(function (results) {
            res.send(results);
        })
    })
});


// app.post('/api/v1/question/:id', function (req, res) {
//     sequelize.query('UPDATE question SET title = \'ОТВЕЧЕНО\' WHERE id = ' + req.body.id,
//         {type: sequelize.QueryTypes.UPDATE}
//     ).then(function (result) {
//         res.send(result)
//     })
// });
// app.post('/api/v1/create', function (req, res) {
//     var newId;
//     sequelize.query('SELECT COUNT(*) FROM question', {type: sequelize.QueryTypes.SELECT}).then(function (result) {
//        newId = result + 1;
//     });
//     var title = req.body.title;
//     var body = req.body.body;
//     sequelize.query('INSERT INTO question (id, title, content, author, date_of_create, price, closed) VALUES ($1,$2,$3,$4,$5,$6,$7)', [newId, title, body, 1, '',1000,''],
//         {type: sequelize.QueryTypes.INSERT})
//         .then(function (result) {
//         res.send(result)
//     })
// });

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