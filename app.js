var express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
routes = require('./routes/index'),
passport = require('passport'),
mysql = require('./model/mysql'),
mongoose = require('mongoose'),

dbConfig = require('./model/db'),

LocalStrategy = require('passport-local').Strategy;

app = express();

mongoose.connect(dbConfig.url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(new LocalStrategy(
    function(username, password, done) {
      mysql.findOne(username), function(err, user) {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { 
            message: 'Некорректный никнейм.'
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Некорректный пароль.' });
        }
        return done(null, user);
      };
    }
));

app.use(session({
                  secret: 'mySecretKey',
                  resave: true,
                  saveUninitialized: true
                }));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

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