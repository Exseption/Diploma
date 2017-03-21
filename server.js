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

app.post('/api/v1/question/:id', function (req, res) {
    sequelize.query('UPDATE question SET title = \'ОТВЕЧЕНО\' WHERE id = ' + req.body.id,
        {type: sequelize.QueryTypes.UPDATE}
    ).then(function (result) {
        res.send(result)
    })
});


app.post('/api/v1/create', function (req, res) {
    var newId;
    sequelize.query('SELECT COUNT(*) FROM question', {type: sequelize.QueryTypes.SELECT}).then(function (result) {
       newId = result + 1;
    });
    var title = req.body.title;
    var body = req.body.body;
    sequelize.query('INSERT INTO question (id, title, content, author, date_of_create, price, closed) VALUES ($1,$2,$3,$4,$5,$6,$7)', [newId, title, body, 1, '',1000,''],
        {type: sequelize.QueryTypes.INSERT})
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
