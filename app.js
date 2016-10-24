var express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),

//session = require('express-session'),
//index = require('./routes/index'),
//seminars = require('./routes/seminars'),
//about = require('./routes/about'),
//register = require('./routes/register'),
//login = require('./routes/login'),
routes = require('./routes/index'),

app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(session({
//  secret: 'keyboard cat',
//  resave: false,
//  saveUninitialized: true
//}));
//
//app.post('/add', function (req, res) {
//    var item = req.body.item;
//    req.session.item = item;
//    console.log(req.session.item);
//    res.redirect('/seminars');
//});
//
//app.get('/test', function (req, res) {
//    res.redirect('/');
//    console.log(req.session.item);
//
//});
//
//
//
//app.post('/login', function (req, res) {
//    res.send(req.body);
//})



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//app.use('/seminars', seminars);
//app.use('/about', about);
//app.use('/register', register);
//app.use('/login', login);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;